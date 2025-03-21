import React, {useEffect, useRef, useState} from 'react';

// Polotno and third party libraries
import { observer } from 'mobx-react-lite';
import { SectionTab } from 'polotno/side-panel';
import type { StoreType } from 'polotno/model/store';
import type { TemplatesSection } from 'polotno/side-panel';

// Actions
import {
  clearAllTemplates,
  getAllTemplateCategories,
  getAllTemplatesByTab,
} from '../../../redux/actions/templateActions';
import {
  TEMPLATE_LOADING,
} from '../../../redux/actions/action-types';
import { failure } from '../../../redux/actions/snackbarActions';

// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';

// Utils
import {
  multiPageLetters,
  defaultTemplateTypes,
  DPI,
} from '../../../utils/constants';
import {
  drawRestrictedAreaOnPage,
  getFileAsBlob,
} from '../../../utils/template-builder';
import { MESSAGES } from '../../../utils/message';
import { getItem, removeItem, setItem } from '../../../utils/local-storage';
import { addSafetyBordersForTemplates } from '../../../utils/templateSafetyBorders';
import { addIdentifiersForTemplates } from '../../../utils/templateIdentifierArea';

// Components
import Dialog from '../../GenericUIBlocks/Dialog';
import SideBarGallery from './SideBarGallery';
import ModalGallery from './ModalGallery';

// Icons
// @ts-ignore
import CustomTemplate from '../../../assets/images/templates/custom-template';
import ModalCross from '../../../assets/images/modal-icons/modal-cross';

// styles
import './styles.scss';
import HireDesigner from './ModalGallery/HireDesigner';

type SideSection = typeof TemplatesSection;

const designDialogStyles = {
  maxWidth: '430px',
  minHeight: '265px',
};

const loadDialogStyles = {
  maxWidth: '430px',
  minHeight: '300px',
};


export type Payload = {
  tab: string;
  page: number;
  pageSize: number;
  productId: string | null;
  search?: string;
  categoryIds?: string[];
};

export type TemplateType = {
  id: string;
  label: string;
  value: string;
};

export type TemplateCategory = {
  id: string;
  title: string;
  totalTemplates: number;
  label?: string;
};

export type TemplateRecord = {
  id: string;
  thumbnailUrl: string;
  title: string;
};

type CustomTemplateSectionProps = {
  store: StoreType;
  active: boolean;
  platformName?: string | null;
  templateGalleryModal?: boolean;
  selectedSection?: string;
  designerQueryAmount?: string | number;
  hireDesignerModal?: any; 
  setHireDesignerModal?: any;
  allowedTemplateSections?: any;
  onClick: () => void;
  onCreateCustomTemplateQuery?: (payload: any) => Promise<any>;
  onGetOneTemplate?: (payload: any) => Promise<any>;
  onGetTemplates?: (payload: Payload) => Promise<any>;
};

const CustomTemplateSection: SideSection = {
  name: 'Templates',
  Tab: observer(
    (props: { store: StoreType; active: boolean; onClick: () => void }) => (
      <SectionTab name="Templates" {...props}>
        <CustomTemplate fill="var(--text-color)" />
      </SectionTab>
    )
  ) as SideSection['Tab'],
  Panel: observer(
    ({
      store,
      platformName,
      templateGalleryModal,
      selectedSection,
      designerQueryAmount,
      hireDesignerModal,
      setHireDesignerModal,
      allowedTemplateSections,
      onCreateCustomTemplateQuery,
      onGetOneTemplate,
      onGetTemplates,
    }: CustomTemplateSectionProps) => {
      const dispatch: AppDispatch = useDispatch();

      const [openGalleryModal, setOpenGalleryModal] = useState(false);
      const [templateTypes, setTemplateTypes] = useState<
      TemplateType[] | null
      >();
      const [currentTemplateType, setCurrentTemplateType] =
        useState<TemplateType>();
      const [selectedCategory, setSelectedCategory] =
        useState<TemplateCategory | null>(null);
      const [selectedRecord, setSelectedRecord] =
        useState<TemplateRecord | null>(null);
      const [templateCategories, setTemplateCategories] = useState<
        TemplateCategory[]
      >([]);
      const [myTemplates, setMyTemplates] = useState<TemplateRecord[]>([]);
      const [teamTemplates, setTeamTemplates] = useState<TemplateRecord[]>([]);
      const [olcTemplates, setOlcTemplates] = useState<TemplateRecord[]>([]);
      const [searchApplied, setSearchApplied] = useState(false);
      const [search, setSearch] = useState('');
      const [loader, setLoader] = useState(false);
      const [pagination, setPagination] = useState({
        count: 0,
        currentPage: 0,
        perPage: 0,
        total: 0,
      });

      const paginationRef = useRef(pagination);
      const searchRef = useRef(search);
      const currentTemplateTypeRef = useRef(currentTemplateType);
      const selectedCategoryRef = useRef(selectedCategory);

      const templates = useSelector(
        (state: RootState) => state.templates.templates
      ) as Record<string, any>;
      const template = useSelector(
        (state: RootState) => state.templates.template
      ) as Record<string, any>;
      const templatesPagination = useSelector(
        (state: any) => state.templates.templatesPagination
      );
      const product = useSelector((state: any) => state.templates.product);
      const envelopeType = useSelector(
        (state: RootState) => state.templates.envelopeType
      );
      const templateLoading = useSelector(
        (state: RootState) => state.templates.templateLoading
      );

      const [isShowDialog, setIsShowDialog] = useState({
        open: false,
        model: '',
      });

      const handleLoadTemplateModel = (record: any) => {
        setSelectedRecord(record);
        handleDialogChange('load-template');
      };

      const getTemplatesByTab = async (page = 1) => {
        try {
          page === 1 && setLoader(true);
          const payload: Payload = {
            tab:
              currentTemplateTypeRef.current?.id === '1'
                ? 'my-templates'
                : currentTemplateTypeRef.current?.id === '2'
                  ? 'team-templates'
                  : 'olc-templates',
            page: page,
            pageSize: 10,
            productId: product?.id,
          };
          searchRef.current.length
            ? (payload.search = searchRef.current)
            : undefined;
          currentTemplateTypeRef.current?.id === '3'
            ? (payload.categoryIds = selectedCategoryRef?.current?.id.split(','))
            : undefined;
          const isCustomTemplateType =
            currentTemplateTypeRef.current?.id === '1' ||
            currentTemplateTypeRef.current?.id === '2';
          const templates: any =
            isCustomTemplateType && onGetTemplates
              ? await onGetTemplates(payload)
              : await getAllTemplatesByTab(payload);
          if (templates?.rows) {
            const newTemplates = templates.rows;

            if (currentTemplateTypeRef.current?.id === '1') {
              if (templates.currentPage === 1) {
                setMyTemplates(newTemplates);
              } else {
                setMyTemplates((prevTemplates) => [
                  ...prevTemplates,
                  ...newTemplates,
                ]);
              }
            } else if (currentTemplateTypeRef.current?.id === '2') {
              if (templates.currentPage === 1) {
                setTeamTemplates(newTemplates);
              } else {
                setTeamTemplates((prevTemplates) => [
                  ...prevTemplates,
                  ...newTemplates,
                ]);
              }
            } else if (currentTemplateTypeRef.current?.id === '3') {
              if (templates.currentPage === 1) {
                setOlcTemplates(newTemplates);
              } else {
                setOlcTemplates((prevTemplates) => [
                  ...prevTemplates,
                  ...newTemplates,
                ]);
              }
            }
            setPagination({
              count: templates.count,
              currentPage: templates.currentPage,
              perPage: templates.perPage,
              total: templates.total,
            });
          }
        } catch (error) {
          return error;
        } finally {
          setLoader(false);
        }
      };

      const getAllCategories = async () => {
        const categories: Record<string, any> = await dispatch(
          getAllTemplateCategories
        );
        if (categories?.status === 200) {
          if (categories?.data?.data) {
            const allCategories = categories?.data?.data?.map((item: any) => ({
              ...item,
              label: item.title,
            }));
            if (allCategories.length === 1) {
              setSelectedCategory(allCategories[0]);
            }
            setTemplateCategories(
              allCategories.filter((item: any) => item.totalTemplates > 0)
            );
          }
        }
      };

      const closeGalleryModal = () => {
        let sideBar = document.getElementsByClassName('polotno-panel-container');
        const firstSideBar = sideBar[0];
        if (firstSideBar) {
          //@ts-ignore
          firstSideBar.style.display = 'block';
        }
        setOpenGalleryModal(false);
        store.openSidePanel(selectedSection || 'text');
        removeItem('currentTab');
        document.body.classList.remove('no-scroll');
      };

      const closeHireDesignerModal = () => {
        setHireDesignerModal(false);
        let sideBar = document.getElementsByClassName('polotno-panel-container');
        const firstSideBar = sideBar[0];
        if (firstSideBar) {
          //@ts-ignore
          firstSideBar.style.display = 'block';
        }
        store.openSidePanel(selectedSection || 'text');
        removeItem('currentTab');
        removeItem('hireDesignerFormState');
        removeItem('queryFiles');
        document.body.classList.remove('no-scroll');
      }

      const handleTabChange = (tab: any) => {
        setCurrentTemplateType(tab);
        setItem('currentTab', JSON.stringify(tab));
      };

      const handleSearch = () => {
        if (search) {
          setSearchApplied(true);
          getTemplatesByTab();
        }
      };

      const removeSearchInput = () => {
        setSearch('');
      };

      const searchKeyDown = (event: any) => {
        if (event.key === 'Enter') {
          handleSearch();
        }
      };

      const handleLoadAllTemplate = (
        dynamicPagination = false,
        initialCall = false
      ) => {
        let page = dynamicPagination
          ? ++paginationRef.current.currentPage
          : paginationRef.current.currentPage;

        if (initialCall) {
          page = 1;
        }

        getTemplatesByTab(page);
      };

      const handleLoadTemplate = async (id: any, type = 'copy') => {
        if (onGetOneTemplate) {
          try {
            const template = await onGetOneTemplate(id);
            dispatch({ type: TEMPLATE_LOADING, payload: true });
            if (template) {
              const workspaceElement = document.querySelector(
                '.polotno-workspace-container'
              );
              if (workspaceElement) {
                workspaceElement.classList.add('show-loader');
              }
              // @ts-ignore
              const paperDimensions = template?.product?.paperSize.split('x');
              store.setUnit({
                unit: 'in',
                dpi: 96,
              });
              store.setSize(
                +paperDimensions[1] * DPI,
                +paperDimensions[0] * DPI
              );
              let jsonData = await getFileAsBlob(template?.templateUrl);
              if (template?.product?.productType === 'Real Penned Letter') {
                let clonedJson = JSON.stringify(jsonData)
                  .replace(/{{/g, '((')
                  .replace(/}}/g, '))');
                jsonData = JSON.parse(clonedJson);
              }
              store.loadJSON(jsonData);
              await store.waitLoading();
              addSafetyBordersForTemplates(template?.product?.id, store);
              dispatch({ type: TEMPLATE_LOADING, payload: false });
              if (workspaceElement) {
                workspaceElement.classList.add('hide-loader');
              }
              if (templateGalleryModal) {
                closeGalleryModal();
              }
            }
          } catch (error) {
            return error;
          } finally {
            dispatch({ type: TEMPLATE_LOADING, payload: false });
            handleDialogChange('');
          }
        } else {
          dispatch(
            failure(
              'Please provide onGetOneTemplate handler to load this template'
            )
          );
        }
      };

      const handleDialogChange = (model = '') => {
        setIsShowDialog((prev) => ({ open: !prev.open, model: model }));
      };

      const processPage = async (index: any, page: any) => {
        return new Promise<void>((resolve) => {
          let pageNumber = page.children.find(
            (el: any) => el.custom?.name === 'page-number'
          );
          const text = index === 0 ? 'Front' : 'Back';

          if (pageNumber) {
            pageNumber.set({ text });
            resolve();
          } else {
            page.addElement({
              type: 'text',
              custom: { name: 'page-number' },
              text,
              width: store.width,
              align: 'center',
              fontSize: 40,
              x: -150,
              y: -50,
              selectable: false,
              alwaysOnTop: true,
            });
            resolve();
          }
        });
      };

      const checkPageNumbers = async () => {
        const promises = store.pages.map(async (page: any, index: any) => {
          await processPage(index, page);
        });

        await Promise.all(promises); // Wait for all promises to resolve
      };

      const handleClearStore = () => {
        store.clear();
        let size: string | string[] = '';
        let isPostCards = false;
        let _product = product;
        if (template?.product) {
          size = template?.product?.paperSize;
          isPostCards = template.product.productType === 'Postcards' || false;
          _product = template.product;
        } else if (product) {
          size = product.selectedSize;
          isPostCards = product.productType === 'Postcards' || false;
        }
        store.setUnit({
          unit: 'in',
          dpi: DPI,
        });
        size = (size as string)?.split('x');
        store.setSize(+size[1] * DPI, +size[0] * DPI);
        store.addPage();

        if (multiPageLetters.includes(_product.productType)) {
          store.addPage();
          store.selectPage(store.pages[0].id);
        }
        drawRestrictedAreaOnPage(store, product, envelopeType);
        addIdentifiersForTemplates(product.id, store);
        handleDialogChange('');
        if (templateGalleryModal) {
          closeGalleryModal();
        }
      };

      const handleScroll = () => {
        const div = document.querySelector('.templatesContent') || document.querySelector('.polotno-panel-container');
        if (div) {
          const isAtBottom =
            div.scrollTop + div.clientHeight + 50 >= div.scrollHeight;
          const isNeedToLoadMore =
            paginationRef.current.currentPage * paginationRef.current.perPage <
            paginationRef.current.count;
          if (isAtBottom && !templatesPagination.loading && isNeedToLoadMore) {
            handleLoadAllTemplate(true);
          }
        }
      };

      useEffect(() => {
        if (templateLoading !== null && templateLoading === false) {
          handleDialogChange('');
          dispatch({ type: TEMPLATE_LOADING, payload: null });
        }
      }, [templateLoading]);

      useEffect(() => {
        if (!search && searchApplied) {
          setSearchApplied(false);
          setSearch('');
          setTimeout(() => {
            getTemplatesByTab();
          }, 100);
        }
      }, [search]);

      useEffect(() => {
        searchRef.current = search;
      }, [search]);

      useEffect(() => {
        currentTemplateTypeRef.current = currentTemplateType;
      }, [currentTemplateType]);

      useEffect(()=>{
        selectedCategoryRef.current = selectedCategory;
      }, [selectedCategory]);

      useEffect(() => {
        paginationRef.current = pagination;
      }, [pagination]);

      useEffect(() => {
        const newTemplateType: TemplateType = {
          id: '3',
          label: platformName ? `${platformName} Templates` : 'OLC Templates',
          value: 'olc-templates'
        };
        if (onGetTemplates) {
          let filteredTemplateTypes: TemplateType[] = [...defaultTemplateTypes, newTemplateType];
          if (Array.isArray(allowedTemplateSections) && allowedTemplateSections.length > 0) {
            filteredTemplateTypes = filteredTemplateTypes.filter((type) => allowedTemplateSections.includes(type.value));
          }
          setTemplateTypes(filteredTemplateTypes);
          const lastSelectedTab = getItem('currentTab');
          if (lastSelectedTab) {
            setCurrentTemplateType(JSON.parse(lastSelectedTab));
          } else {
            setCurrentTemplateType(defaultTemplateTypes[0]);
          }
        } else {
          setTemplateTypes([newTemplateType]);
          setCurrentTemplateType(newTemplateType);
        }
        getAllCategories();
        return () => {
          dispatch(clearAllTemplates());
        };
      }, []);

      useEffect(() => {
        if (currentTemplateType && Object.keys(currentTemplateType).length) {
          getTemplatesByTab();
        }
      }, [currentTemplateType]);

      useEffect(() => {
        if (currentTemplateType && Object.keys(currentTemplateType).length && currentTemplateType?.id === '3' &&
          templateCategories?.length >= 1) {
          getTemplatesByTab();
        }
      }, [selectedCategory]);

      useEffect(() => {
        const div = document.querySelector('.templatesContent') || document.querySelector('.polotno-panel-container');

        if (store.openedSidePanel === 'Templates' && templateGalleryModal) {
          let sideBar = document.getElementsByClassName('polotno-panel-container');
          const firstSideBar = sideBar[0];
          if (firstSideBar) {
            //@ts-ignore
            firstSideBar.style.display = 'contents';
          }
          setOpenGalleryModal(true);
          document.body.classList.add('no-scroll');
        }

        if (div) {
          div.removeEventListener('scroll', handleScroll);
          div.addEventListener('scroll', handleScroll);
        }
        return () => {
          div?.removeEventListener('scroll', handleScroll);
        };
      }, [templates]);

      return (
        <>
          {templateGalleryModal && !hireDesignerModal ? (
            <ModalGallery
              product={product}
              openGalleryModal={openGalleryModal}
              pagination={pagination}
              currentTemplateTypeRef={currentTemplateTypeRef}
              selectedCategory={selectedCategory}
              templateCategories={templateCategories}
              currentTemplateType={currentTemplateType}
              templateTypes={templateTypes}
              search={search}
              searchApplied={searchApplied}
              loader={loader}
              platformName={platformName}
              myTemplates={myTemplates}
              teamTemplates={teamTemplates}
              olcTemplates={olcTemplates}
              designerQueryAmount={designerQueryAmount}
              setHireDesignerModal={setHireDesignerModal}
              setSearch={setSearch}
              handleSearch={handleSearch}
              removeSearchInput={removeSearchInput}
              searchKeyDown={searchKeyDown}
              setCurrentTemplateType={setCurrentTemplateType}
              setSelectedCategory={setSelectedCategory}
              handleLoadTemplateModel={handleLoadTemplateModel}
              handleDialogChange={handleDialogChange}
              handleTabChange={handleTabChange}
              closeGalleryModal={closeGalleryModal}
              setOpenGalleryModal={setOpenGalleryModal}
            />
          ) : !hireDesignerModal && (
            <SideBarGallery
              selectedCategory={selectedCategory}
              templateCategories={templateCategories}
              currentTemplateType={currentTemplateType}
              templateTypes={templateTypes}
              search={search}
              searchApplied={searchApplied}
              loader={loader}
              platformName={platformName}
              myTemplates={myTemplates}
              teamTemplates={teamTemplates}
              olcTemplates={olcTemplates}
              setSearch={setSearch}
              handleSearch={handleSearch}
              removeSearchInput={removeSearchInput}
              searchKeyDown={searchKeyDown}
              setCurrentTemplateType={setCurrentTemplateType}
              setSelectedCategory={setSelectedCategory}
              handleLoadTemplateModel={handleLoadTemplateModel}
              handleDialogChange={handleDialogChange}
            />
          )}

          <div className="custom-template-section">
            {isShowDialog.open && isShowDialog.model === 'design-own' && (
              <Dialog
                icon={<ModalCross />}
                title={MESSAGES.TEMPLATE.DESIGN_YOUR_OWN.TITLE}
                subHeading={MESSAGES.TEMPLATE.DESIGN_YOUR_OWN.HEADING}
                description={MESSAGES.TEMPLATE.DESIGN_YOUR_OWN.PARAGRAPH}
                open={isShowDialog.open}
                handleClose={() => handleDialogChange('')}
                onCancel={() => handleDialogChange('')}
                onSubmit={handleClearStore}
                customStyles={designDialogStyles}
                cancelText="Cancel"
                submitText="OK"
              />
            )}
            {hireDesignerModal && (
              <HireDesigner
                open={hireDesignerModal}
                onCreateCustomTemplateQuery={onCreateCustomTemplateQuery}
                productId={product?.id}
                onClose={closeHireDesignerModal}
              />
            )}
            {isShowDialog.open && isShowDialog.model === 'load-template' && (
              <Dialog
                icon={<ModalCross />}
                title={MESSAGES.TEMPLATE.SELECT_TEMPLATE.TITLE}
                subHeading={MESSAGES.TEMPLATE.SELECT_TEMPLATE.HEADING}
                description={MESSAGES.TEMPLATE.SELECT_TEMPLATE.PARAGRAPH}
                open={isShowDialog.open}
                handleClose={() => handleDialogChange('')}
                onCancel={() => handleDialogChange('')}
                onSubmit={() => handleLoadTemplate(selectedRecord?.id)}
                customStyles={loadDialogStyles}
                loading={templateLoading || false}
                cancelText="Cancel"
                submitText="OK"
              />
            )}
          </div>
        </>
      );
    }
  ) as unknown as SideSection['Panel'],
};

export default CustomTemplateSection;