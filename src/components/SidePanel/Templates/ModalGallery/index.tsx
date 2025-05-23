import React from 'react';

// Utils
import { TemplateCategory, TemplateRecord, TemplateType } from '../customTemplateSection';
import { hexToRgba, removeSThroughOne } from '../../../../utils/helper';
import { Products } from '../../../../utils/products';

// Components
import TempCard from '../TemplatesCard';
import Tabs from '../../../GenericUIBlocks/Tabs';
import Typography from '../../../GenericUIBlocks/Typography';
import GeneralSelect from '../../../GenericUIBlocks/GeneralSelect';
import Input from '../../../GenericUIBlocks/Input';
import Dialog from '../../../GenericUIBlocks/Dialog';

// Icons
import DesignIcon from '../../../../assets/images/templates/template-default-design';
import Designer from '../../../../assets/images/templates/designer';

const galleryDialogStyles = {
    maxWidth: '1090px',
    minHeight: 'calc(100% - 50px)',
};

type CustomTemplateSectionProps = {
    product: any,
    openGalleryModal: boolean,
    selectedCategory: TemplateCategory | null,
    templateCategories: TemplateCategory[],
    currentTemplateType: TemplateType | undefined,
    templateTypes: TemplateType[] | null | undefined,
    designerQueryAmount?: string | number;
    search: any,
    searchApplied: boolean,
    loader: boolean,
    platformName: any,
    myTemplates: TemplateRecord[],
    teamTemplates: TemplateRecord[],
    olcTemplates: TemplateRecord[],
    pagination: any,
    setSearch: any,
    handleSearch: any,
    removeSearchInput: any,
    searchKeyDown: any,
    currentTemplateTypeRef: any,
    setCurrentTemplateType: any,
    setSelectedCategory: any,
    handleLoadTemplateModel: any,
    handleTabChange: any,
    handleDialogChange: any,
    closeGalleryModal: any,
    setOpenGalleryModal: any
    setHireDesignerModal: any;
};


const ModalGallery = (props: CustomTemplateSectionProps) => {

    const {
        product,
        openGalleryModal,
        selectedCategory,
        templateCategories,
        currentTemplateType,
        templateTypes,
        designerQueryAmount,
        search,
        searchApplied,
        loader,
        platformName,
        myTemplates,
        teamTemplates,
        olcTemplates,
        pagination,
        setSearch,
        handleSearch,
        removeSearchInput,
        searchKeyDown,
        currentTemplateTypeRef,
        setSelectedCategory,
        handleLoadTemplateModel,
        handleTabChange,
        handleDialogChange,
        closeGalleryModal,
        setOpenGalleryModal,
        setHireDesignerModal,
    } = props;

    const primaryColorExtract = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();

    const primaryColorRGBA = hexToRgba(primaryColorExtract, 0.5);

    const currentTemplates = currentTemplateType?.id === '1'
        ? myTemplates
        : currentTemplateType?.id === '2'
            ? teamTemplates
            : currentTemplateType?.id === '3'
                ? olcTemplates
                : []

    const uniqueCurrentTemplates = Array.from(
        new Map(currentTemplates.map((item) => [item.id, item])).values()
    );

    return (
        <>
            <Dialog
                customStyles={galleryDialogStyles}
                open={openGalleryModal}
                handleClose={closeGalleryModal}
                title={
                    product?.productType === 'Postcards'
                        ? `${product?.productType} (${product?.selectedSize || product?.paperSize})`
                        : Products?.find(item => item?.id === product?.id)?.title || product?.productType
                }
                isGallery={true}
            >
                <div className="topBar">
                    <div>
                        <Tabs
                            value={currentTemplateType || {}}
                            onChange={handleTabChange}
                            tabs={templateTypes || []}
                            className="myCustomTabs"
                            tabClassName="myTab"
                            indicatorClassName="myIndicator"
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            value={search}
                            // @ts-ignore
                            onKeyDown={searchKeyDown}
                            onChange={(e: any) => setSearch(e.target.value.trimStart())}
                            placeholder="Search templates by name or ID"
                            onClick={handleSearch}
                            searchApplied={searchApplied}
                            removeSearchInput={removeSearchInput}
                            inputIcon={true}
                            gellerySearch={true}
                        />
                    </div>
                </div>
                <div className="selectBar">
                    {currentTemplateType?.id === '3' &&
                        templateCategories?.length > 1 && (
                            <div>
                                <GeneralSelect
                                    placeholder="Select Category"
                                    options={templateCategories as any}
                                    setSelectedValue={setSelectedCategory as any}
                                    selectedValue={selectedCategory as any}
                                    builderSelect={true}
                                    gallerySelect={true}
                                    clearField={true}
                                    // @ts-ignore
                                    search={(() => { }) as any}
                                    updateErrors={() => { }}
                                    disableClearable={false}
                                    templateBuilder={true}
                                />
                            </div>
                        )}
                    <Typography>{removeSThroughOne(`${currentTemplates.length > 0 ? pagination.total : 0} templates`)}</Typography>
                </div>
                <div className={`templatesContent ${currentTemplateType?.id === '3' && "heightOLC"}`} style={{
                    justifyContent: loader || searchApplied ? "center" : "flex-start",
                    alignItems: searchApplied ? "center" : "flex-start",
                    height: searchApplied ? "calc(100vh - 300px)" : "auto",
                    overflowY: product?.productType === "Personal Letters" && currentTemplates.length === 0 ? "hidden" : "scroll"
                }}>
                    {!loader && !searchApplied && currentTemplateTypeRef.current?.id === '1' && (
                        <div>
                            <div
                                className={`defaultDesign 
                      ${product?.id === '13' &&
                                        product?.size?.find((product: any) => product?.size === "4x6") || product?.paperSize === "4x6" ? "postcard-4x6"
                                        : product?.id === '15' && product?.size?.find((product: any) => product?.size === "6x11") || product?.paperSize === "6x11" ? "postcard-6x11"
                                            : product?.id === '14' && product?.size?.find((product: any) => product?.size === "6x9") || product?.paperSize === "6x9" ? "postcard-6x9"
                                                : product?.id === '5' || product?.id === '16' ? 'personalLetter' : product?.id === '2' || product?.id === '4' || product?.id === '18' ? 'professionalLetter' : product?.id === '9' ? 'biFold' : product?.id === '11' ? 'triFold' : null}`}
                                onClick={() => handleDialogChange('design-own')}
                                style={{
                                    boxShadow: `inset 0 0 0 2px ${primaryColorRGBA}`
                                }}
                            >
                                <DesignIcon fill="var(--primary-color)" />
                                <Typography>Design Your Own</Typography>
                            </div>
                            <Typography className='ownHeading'>Design Your Own</Typography>
                        </div>
                    )}
                    {!loader && !searchApplied && currentTemplateTypeRef.current?.id !== '2' && designerQueryAmount && (
                        <div>
                            <div
                                className={`defaultDesign 
                      ${product?.id === '13' &&
                                        product?.size?.find((product: any) => product?.size === "4x6") || product?.paperSize === "4x6" ? "postcard-4x6"
                                        : product?.id === '15' && product?.size?.find((product: any) => product?.size === "6x11") || product?.paperSize === "6x11" ? "postcard-6x11"
                                            : product?.id === '14' && product?.size?.find((product: any) => product?.size === "6x9") || product?.paperSize === "6x9" ? "postcard-6x9"
                                                : product?.id === '5' || product?.id === '16' ? 'personalLetter' : product?.id === '2' || product?.id === '4' || product?.id === '18' ? 'professionalLetter' : product?.id === '9' ? 'biFold' : product?.id === '11' ? 'triFold' : null}`}
                                onClick={() => {
                                    setOpenGalleryModal(false);
                                    setHireDesignerModal(true);
                                }}
                                style={{
                                    boxShadow: `inset 0 0 0 2px ${primaryColorRGBA}`
                                }}
                            >
                                <Designer fill="var(--primary-color)" />
                                <Typography>Hire a Designer</Typography>
                            </div>
                            <Typography className='ownHeading'>Hire a Designer +${designerQueryAmount}</Typography>
                        </div>
                    )}
                    <TempCard
                        templates={uniqueCurrentTemplates}
                        handleLoadTemplateModel={handleLoadTemplateModel}
                        loading={loader}
                        platformName={platformName}
                        currentTemplateType={currentTemplateType}
                        product={product}
                        searchApplied={searchApplied}
                        primaryColorRGBA={primaryColorRGBA}
                        designerQueryAmount={designerQueryAmount}
                    />
                </div>
            </Dialog>
        </>
    );
}

export default ModalGallery;