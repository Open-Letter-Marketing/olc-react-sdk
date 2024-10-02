import React from 'react';

// Utils
import { MESSAGES } from '../../../../utils/message';
import { TemplateCategory, TemplateRecord, TemplateType } from '../customTemplateSection';

// Components
import Typography from '../../../GenericUIBlocks/Typography';
import GeneralSelect from '../../../GenericUIBlocks/GeneralSelect';
import Input from '../../../GenericUIBlocks/Input';

// Icons
import DesignIcon from '../../../../assets/images/templates/template-default-design';
import dummyTemplateIcon from '../../../../assets/images/templates/template-default-design';

// styles
import './styles.scss';


const templateTextStyles: React.CSSProperties = {
    color: `#000`,
    fontSize: `12px`,
    fontStyle: `normal`,
    fontWeight: `500`,
    lineHeight: `normal`,
    marginBottom: `16px`,
};


type CustomTemplateSectionProps = {
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
    setSearch: any,
    handleSearch: any,
    removeSearchInput: any,
    searchKeyDown: any,
    setCurrentTemplateType: any,
    setSelectedCategory: any,
    handleLoadTemplateModel: any,
    handleDialogChange: any,
};


const SideBarSelction = (props: CustomTemplateSectionProps) => {

    const {
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
        setSearch,
        handleSearch,
        removeSearchInput,
        searchKeyDown,
        setCurrentTemplateType,
        setSelectedCategory,
        handleLoadTemplateModel,
        handleDialogChange,
    } = props;

    return (
        <div className="custom-template-section">
            <div className="templateTabsWrapper">
                <div style={{ marginTop: '8px' }}>
                    <GeneralSelect
                        placeholder="Template Types"
                        options={templateTypes as any}
                        setSelectedValue={setCurrentTemplateType as any}
                        selectedValue={currentTemplateType as any}
                        builderSelect={true}
                        // @ts-ignore
                        search={() => { }}
                        updateErrors={() => { }}
                        disableClearable={true}
                        templateBuilder={true}
                    />
                </div>
                {currentTemplateType?.id === '3' && templateCategories?.length > 1 && (
                    <div style={{ marginTop: 8 }}>
                        <GeneralSelect
                            placeholder="Select Category"
                            options={templateCategories as any}
                            setSelectedValue={setSelectedCategory as any}
                            selectedValue={selectedCategory as any}
                            builderSelect={true}
                            clearField={true}
                            // @ts-ignore
                            search={(() => { }) as any}
                            updateErrors={() => { }}
                            disableClearable={false}
                            templateBuilder={true}
                        />
                    </div>
                )}
                <div
                    className="searchWrapper">
                    <Input
                        type="text"
                        value={search}
                        builderInput={true}
                        // @ts-ignore
                        onKeyDown={searchKeyDown}
                        onChange={(e: any) => setSearch(e.target.value.trimStart())}
                        placeholder="Search by template name"
                        inputIcon={true}
                        onClick={handleSearch}
                        searchApplied={searchApplied}
                        removeSearchInput={removeSearchInput}
                    />
                </div>
                {loader ? (
                    <div className="noTemplateText">
                        <Typography>{MESSAGES.TEMPLATE.LOADING_TEMPLATE}</Typography>
                    </div>
                ) : currentTemplateType?.id === '1' ? (
                    <>
                        <div
                            className="default-design"
                            onClick={() => handleDialogChange('design-own')}
                        >
                            <DesignIcon fill="var(--primary-color)" />
                            <Typography style={templateTextStyles}>
                                {MESSAGES.TEMPLATE.DESIGN_NEW}
                            </Typography>
                        </div>
                        {myTemplates.length ? (
                            myTemplates.map((template: any, i: number) => (
                                <div
                                    className="design-template"
                                    key={i}
                                    onClick={() => handleLoadTemplateModel(template)}
                                >
                                    <img
                                        src={template.thumbnailUrl}
                                        alt={template.title}
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            //@ts-ignore
                                            currentTarget.src = dummyTemplateIcon;
                                            currentTarget.classList.add('dummy-image');
                                        }}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="noTemplateText">
                                <Typography>{MESSAGES.TEMPLATE.NO_MY_TEMPLATES}</Typography>
                            </div>
                        )}
                    </>
                ) : currentTemplateType?.id === '2' ? (
                    <>
                        {teamTemplates.length ? (
                            teamTemplates?.map((template: any, i: number) => (
                                <div
                                    className="design-template"
                                    key={i}
                                    onClick={() => handleLoadTemplateModel(template)}
                                >
                                    <img
                                        src={template.thumbnailUrl}
                                        alt={template.title}
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            //@ts-ignore
                                            currentTarget.src = dummyTemplateIcon;
                                            currentTarget.classList.add('dummy-image');
                                        }}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="noTemplateText">
                                <Typography>
                                    {MESSAGES.TEMPLATE.NO_TEAM_TEMPLATES}
                                </Typography>
                            </div>
                        )}
                    </>
                ) : currentTemplateType?.id === '3' ? (
                    <>
                        {olcTemplates.length ? (
                            olcTemplates?.map((template, i) => (
                                <div
                                    className="design-template"
                                    key={i}
                                    onClick={() => handleLoadTemplateModel(template)}
                                >
                                    <img
                                        src={template.thumbnailUrl}
                                        alt={template.title}
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            //@ts-ignore
                                            currentTarget.src = dummyTemplateIcon;
                                            currentTarget.classList.add('dummy-image');
                                        }}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="noTemplateText">
                                <Typography>
                                    {platformName
                                        ? `No ${platformName} Templates to show`
                                        : MESSAGES.TEMPLATE.NO_OLC_TEMPLATES}
                                </Typography>
                            </div>
                        )}
                    </>
                ) : null}
            </div>
        </div>
    );
}

export default SideBarSelction;