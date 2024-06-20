export const addElementsforRealPennedLetters = (store) => {
    const page = store.pages[0];
  
    page.addElement({
      id: "blocked",
      type: "figure",
      name: "",
      opacity: 1,
      visible: true,
      selectable: false,
      removable: false,
      alwaysOnTop: true,
      showInExport: true,
      x: -1.850472230905276e-12,
      y: -2.9487523534043754e-13,
      width: 528,
      height: 80.739,
      rotation: 0,
      animations: [],
      blurEnabled: false,
      blurRadius: 10,
      brightnessEnabled: false,
      brightness: 0,
      sepiaEnabled: false,
      grayscaleEnabled: false,
      shadowEnabled: false,
      shadowBlur: 5,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: "black",
      shadowOpacity: 1,
      draggable: false,
      resizable: false,
      contentEditable: false,
      styleEditable: true,
      subType: "rect",
      fill: "rgba(208,0,0,1)",
      dash: [],
      strokeWidth: 0,
      stroke: "#0c0c0c",
      cornerRadius: 0,
    });
  
    page.addElement({
      id: 'header',
      type: 'text',
      name: '',
      opacity: 1,
      visible: true,
      selectable: true,
      removable: false,
      alwaysOnTop: true,
      showInExport: true,
      x: 25,
      y: 130,
      width: 300,
      height: 40,
      rotation: 0,
      animations: [],
      blurEnabled: false,
      blurRadius: 10,
      brightnessEnabled: false,
      brightness: 0,
      sepiaEnabled: false,
      grayscaleEnabled: false,
      shadowEnabled: false,
      shadowBlur: 5,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'black',
      shadowOpacity: 1,
      draggable: false,
      resizable: false,
      contentEditable: true,
      styleEditable: false,
      text: "Hi FirstNaame,",
      fontSize: 20,
      fontFamily: 'lexi Regular',
      fontStyle: 'normal',
      fontWeight: 'normal',
      textDecoration: '',
      fill: 'blue',
      align: 'start',
      verticalAlign: 'top',
      strokeWidth: 0,
      stroke: 'black',
      lineHeight: 1.75,
      letterSpacing: 0,
      backgroundEnabled: false,
      backgroundColor: '#7ED321',
      backgroundOpacity: 1,
      backgroundCornerRadius: 0.5,
      backgroundPadding: 0.5,
    });
  
  
  
    page.addElement({
      id: 'content',
      type: 'text',
      name: '',
      opacity: 1,
      visible: true,
      selectable: true,
      removable: false,
      alwaysOnTop: true,
      showInExport: true,
      x: 25.499999994998234,
      y: 220.60449354986338,
      width: 477,
      height: 400,
      rotation: 0,
      animations: [],
      blurEnabled: false,
      blurRadius: 10,
      brightnessEnabled: false,
      brightness: 0,
      sepiaEnabled: false,
      grayscaleEnabled: false,
      shadowEnabled: false,
      shadowBlur: 5,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'black',
      shadowOpacity: 1,
      draggable: false,
      resizable: false,
      contentEditable: true,
      styleEditable: false,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In recent projects, we've focused heavily on OLC to enhance digital engagement. Real Penned Letters, is a unique initiative.\n\nAs we continue to develop OLC platforms, we remain committed to integrating elements like Real Penned Letters to enhance digital and personal communication. \n",
      fontSize: 20,
      fontFamily: 'lexi Regular',
      fontStyle: 'normal',
      fontWeight: 'normal',
      textDecoration: '',
      fill: 'blue',
      align: 'start',
      verticalAlign: 'top',
      strokeWidth: 0,
      stroke: 'black',
      lineHeight: 1.75,
      letterSpacing: 0,
      backgroundEnabled: false,
      backgroundColor: '#7ED321',
      backgroundOpacity: 1,
      backgroundCornerRadius: 0.5,
      backgroundPadding: 0.5,
    });
  
  
    page.addElement({
      id: 'footer',
      type: 'text',
      name: '',
      opacity: 1,
      visible: true,
      selectable: true,
      removable: false,
      alwaysOnTop: true,
      showInExport: true,
      x: 322.49999999499846,
      y: 651.7346179851188,
      width: 180,
      height: 75,
      rotation: 0,
      animations: [],
      blurEnabled: false,
      blurRadius: 10,
      brightnessEnabled: false,
      brightness: 0,
      sepiaEnabled: false,
      grayscaleEnabled: false,
      shadowEnabled: false,
      shadowBlur: 5,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'black',
      shadowOpacity: 1,
      draggable: false,
      resizable: false,
      contentEditable: true,
      styleEditable: false,
      text: "Regards,\nYour Name",
      fontSize: 20,
      fontFamily: 'lexi Regular',
      fontStyle: 'normal',
      fontWeight: 'normal',
      textDecoration: '',
      fill: 'blue',
      align: 'start',
      verticalAlign: 'top',
      strokeWidth: 0,
      stroke: 'black',
      lineHeight: 1.75,
      letterSpacing: 0,
      backgroundEnabled: false,
      backgroundColor: '#7ED321',
      backgroundOpacity: 1,
      backgroundCornerRadius: 0.5,
      backgroundPadding: 0.5,
    });
    
    store.history.clear();
  }