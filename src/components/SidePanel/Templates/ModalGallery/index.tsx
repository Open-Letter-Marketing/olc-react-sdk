import React from 'react';

// Utils
import { TemplateCategory, TemplateRecord, TemplateType } from '../customTemplateSection';
import { hexToRgba, removeSThroughOne } from '../../../../utils/helper';

// Components
import TempCard from '../TemplatesCard';
import Tabs from '../../../GenericUIBlocks/Tabs';
import Typography from '../../../GenericUIBlocks/Typography';
import GeneralSelect from '../../../GenericUIBlocks/GeneralSelect';
import Input from '../../../GenericUIBlocks/Input';
import Dialog from '../../../GenericUIBlocks/Dialog';

// Icons
import DesignIcon from '../../../../assets/images/templates/template-default-design';

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
    templateTypes: [TemplateType] | null | undefined,
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
    closeGalleryModal: any
};


const ModalGallery = (props: CustomTemplateSectionProps) => {

    const {
        product,
        openGalleryModal,
        selectedCategory,
        templateCategories,
        currentTemplateType,
        templateTypes,
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
    } = props;

    const primaryColorExtract = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();

    const primaryColorRGBA = hexToRgba(primaryColorExtract, 0.5);

    return (
        <>
            <Dialog
                customStyles={galleryDialogStyles}
                open={openGalleryModal}
                handleClose={closeGalleryModal}
                title={
                    product?.productType === 'Postcards'
                        ? `${product?.productType} (${product?.selectedSize})`
                        : product?.title
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
                    <Typography>{removeSThroughOne(`${pagination.total} templates`)}</Typography>
                </div>
                <div className={`templatesContent ${currentTemplateType?.id === '3' && "heightOLC"}`} style={{
                    justifyContent: loader ? "center" : "flex-start",
                    alignItems: searchApplied ? "center" : "flex-start"
                }}>
                    {!loader && !searchApplied && currentTemplateTypeRef.current?.id === '1' && (
                        <div>
                            <div
                                className={`defaultDesign 
                      ${product?.id === '13' &&
                                        product?.size.find((product: any) => product?.size === "4x6") ? "postcard-4x6"
                                        : product?.id === '15' && product?.size.find((product: any) => product?.size === "6x11") ? "postcard-6x11"
                                            : product?.id === '14' && product?.size.find((product: any) => product?.size === "6x9") ? "postcard-6x9"
                                                : product?.id === '5' ? 'personalLetter' : product?.id === '2' || product?.id === '4' ? 'professionalLetter' : product?.id === '9' ? 'biFold' : product?.id === '11' ? 'triFold' : null}`}
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
                    <TempCard
                        templates={
                            currentTemplateType?.id === '1'
                                ? myTemplates
                                : currentTemplateType?.id === '2'
                                    ? teamTemplates
                                    : currentTemplateType?.id === '3'
                                        ? olcTemplates
                                        : []
                        }
                        handleLoadTemplateModel={handleLoadTemplateModel}
                        loading={loader}
                        platformName={platformName}
                        currentTemplateType={currentTemplateType}
                        product={product}
                        searchApplied={searchApplied}
                        primaryColorRGBA={primaryColorRGBA}
                    />
                </div>
            </Dialog>
        </>
    );
}

export default ModalGallery;