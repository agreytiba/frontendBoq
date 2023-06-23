import { tokens } from "../theme";

export const mockDataTeam = [
  {
    id: 1,
    name: "grey matter",
    email: "greymatter@gmail.com",
    age: 35,
    phone: "(255)735-338-149",
    access: "admin",
  },
  {
    id: 2,
    name: "mweme august",
    email: "mwemeaugust@gmail.com",
    age: 42,
    phone: "(255)735-338-149",
    access: "doctor",
  },
  {
    id: 3,
    name: "anithe john",
    email: "anithejohn@gmail.com",
    age: 45,
    phone: "(255)735-338-149",
    access: "user",
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    age: 16,
    phone:"(255)735-338-149",
    access: "doctor",
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "(255)735-338-149",
    access: "user",
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    age: 150,
    phone: "(255)735-338-149",
    access: "doctor",
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    age: 44,
    phone: "(543)124-0123",
    access: "user",
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    age: 36,
    phone: "(222)444-5555",
    access: "doctor",
  },
  {
    id: 9,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "doctor",
  },
];

export const mockDataPatient = [
  {
    id: 1,
    name: "makena mombeki",
    email: "maken@gmail.com",
    age: 35,
    phone: "(255)735-338-149",
    address: "Dodoma mjini, chinangali",
    city: "Dodoma",
    zipCode: "10001",
    registrarId: 123512,
  },
  {
    id: 2,
    name: " mwesi kyraruzi",
    email: "mwesi@gmail.com",
    age: 42,
    phone:"(255)735-338-149",
    address: "karagwe, nyaishozi",
    city: "kagera",
    zipCode: "13151",
    registrarId: 123512,
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    age: 45,
    phone: "(255)735-338-149",
    address: "ilala, uhuru street",
    city: "Dar es salaam",
    zipCode: "87281",
    registrarId: 4132513,
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    age: 16,
    phone:"(255)735-338-149",
    address: "1514 Main Street, New York, NY 22298",
    city: "New York",
    zipCode: "15551",
    registrarId: 123512,
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "(255)735-338-149",
    address: "11122 Welping Ave, Tenting, CD 21321",
    city: "Tenting",
    zipCode: "14215",
    registrarId: 123512,
  },
  {
    id: 6,
    name: "maria musa",
    email: "maria@gmail.com",
    age: 150,
    phone: "(255)735-338-149",
    address: "arush mjini",
    city: "arusha",
    zipCode: "10001",
    registrarId: 123512,
  },
  {
    id: 7,
    name: "juma amini",
    email: "jumaamini@gmail.com",
    age: 44,
    phone: "(255)735-338-149",
    address: "tanga mjini,barabara 6",
    city: "tanga",
    zipCode: "51523",
    registrarId: 123512,
  },
  {
    id: 8,
    name: "kulwa petro",
    email: "kulwapetro@gmail.com",
    age: 36,
    phone: "(255)735-338-149",
    address: " shinyanga mjin, ndala",
    city: "Shinganya",
    zipCode: "44215",
    registrarId: 512315,
  },
  {
    id: 9,
    name: "mwakasege chris",
    email: "mwakasegechris@gmail.com",
    age: 65,
    phone: "(255)735-338-149",
    address: "mbeya mjini,uhuru street",
    city: "Mbeya",
    zipCode: "111234",
    registrarId: 928397,
  },
  {
    id: 10,
    name: "mwita kameka",
    email: "mwitakameka@gmail.com",
    age: 42,
    phone: "(255)735-338-149",
    address: "kilole, maduka tisa",
    city: "Mwanza",
    zipCode: "44215",
    registrarId: 533215,
  },
  {
    id: 11,
    name: "massawe john",
    email: "massawejohn@gmail.com",
    age: 11,
    phone: "(255)735-338-149",
    address: "mbezi mwisho, magari saba street",
    city: "Dar es salaam",
    zipCode: "1234",
    registrarId: 92197,
  },
];


export const mockDataAppointment = [
  {
    id: 1,
    patientName: "makena mombeki",
    doctorName: "john mathew",
    appointmentDate: "23/06/2023",
    appointmentTime: "04:00 - 05:00",
    department: "dental",
    reason: "dental problem",
    paymentStatus:"not paid"
  },{
    id: 2,
    patientName: "agrey ",
    doctorName: "john mathew",
    appointmentDate: "23/06/2023",
    appointmentTime: "04:00 - 05:00",
    department: "dental",
    reason: "dental problem",
    paymentStatus:"not paid"
  },{
    id: 3,
    patientName: "mweme grey",
    doctorName: "john mathew",
    appointmentDate: "23/06/2023",
    appointmentTime: "04:00 - 05:00",
    department: "dental",
    reason: "dental problem",
    paymentStatus:"paid"
  },

];


export const mockDoctors = [
   
  {
    id: 1,
    name: "mweme august",
    dept: "surgeon",
    age: 42,
    img: "",
  },

  {
    id: 2,
    name: "Anya Stark",
    dept: "urologist",
    age: 50,
    img: ""
  },
  
  {
    id: 3,
    name: "Ever Melisandre",
    dept: "neurologist",
    age: 48,
    img: ""
  },

  {
    id: 4,
    name: "Rossini Frances",
   
  },
  {
    id: 5,
    name: "Harvey Roxie",
    dept: "orthodontist",
    age:"53",
    img:""
  },
];

export const mockBarData = [
  {
    country: "AD",
    "doctor": 137,
    "doctorColor": "hsl(286, 70%, 50%)",
    patient: 96,
    patientColor: "hsl(296, 70%, 50%)",
    
  },
  {
    country: "AE",
    "doctor": 55,
   "doctorColor": "hsl(286, 70%, 50%)",
   patient: 28,
   patientColor: "hsl(111, 70%, 50%)",
  
  },
  {
    country: "AF",
    "doctor": 109,
  "doctorColor": "hsl(286, 70%, 50%)",
   patient: 23,
   patientColor: "hsl(96, 70%, 50%)",
   
  },
  {
    department: "AG",
    "doctor": 133,
    "doctorColor": "hsl(286, 70%, 50%)",
   patient: 52,
   patientColor: "hsl(326, 70%, 50%)",
    
  },
  {
    department: "AI",
    "doctor": 81,
    "doctorColor": "hsl(286, 70%, 50%)",
   patient: 80,
   patientColor: "hsl(325, 70%, 50%)",
  
  },
  {
    department: "AL",
    "doctor": 66,
   "doctorColor": "hsl(286, 70%, 50%)",
   patient: 111,
   patientColor: "hsl(334, 70%, 50%)",
  
  },
  {
  department:"AM",
    "doctor": 80,
    "doctorColor": "hsl(286, 70%, 50%)",
   patient: 47,
   patientColor: "hsl(141, 70%, 50%)",
    
  },
];


