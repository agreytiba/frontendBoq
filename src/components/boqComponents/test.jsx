//     const endpoints = {
//       wall: "savedwalling",
//       roof: "savedroofing",
//       gyp: "savedgypsum",
//       finish: "savedfinishing",
//       tile: "savedtiles",
//       pvc: "savedpvcs",
//       electric: "savedelectrical",
//       plaster: "savedplastering",
//       blind: "savedblinding",
//       strip: "savedStrips",
//       foundwall: "savedwallfoundations",
//       pad: "savedpads",
//       beam: "savedBeams",
//       concrete: "savedconcretes",
//       blandout: "savedblandoutside",
//       blandin: "savedblandinside",
//       skimin: "savedskiminside",
//       skimout: "savedskimoutside",
//       grill: "savedgrills",
//       panel: "savedpanels",
//       frame: "savedframes",
//       shutter: "savedshutters",
//     };

//     try {
//       const mapData = JSON.parse(localStorage.getItem("mapData"));
//       const mapId = mapData._id;

//       const response = await axios.post(API_BASE_URL + `/api/${endpoints[name]}`, { mapId });

//       if (response.data) {
//         const combinedData = {
//           mapId,
//           savedPreId: response.data._id,
//         };
//         localStorage.setItem("savedData", JSON.stringify(combinedData));
//       }
//     } catch (error) {
//       console.error("Error creating saved pre:", error.response?.data);
//     }
//   };