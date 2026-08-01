import { Home, BadgePlus, UserRound, Banknote, ChartNoAxesCombinedIcon, Utensils ,Fuel, Hamburger, GlobeCheck, CarTaxiFrontIcon, Landmark, BanknoteIcon, Wallet, CreditCard, Toolbox, Clapperboard, Hospital, GitGraphIcon} from 'lucide-react-native'
import React from 'react'

type bottomTabDataProps={
  id:number 
  name:string 
  text:string 
  icon:(focused:boolean,size:number,color:string)=>React.ReactNode
  
}

export const bottomTabData:bottomTabDataProps[] = [
  {
    id: 1,
    name: "home",
    text: "Home",
    icon: (focused,size,color) => (
      <Home
        size={size ?? 20}
        color={color ??(focused ? "#0a0a0a" : "#a3a3a3")}
        strokeWidth={focused ? 1.6 : 1}
      />
    )
  },
  {
    id: 2,
    name: "Budget",
    text: "Budget",
    icon: (focused,size,color) => (
      <ChartNoAxesCombinedIcon
        size={size ?? 20}
        color={color ??(focused ? "#0a0a0a" : "#a3a3a3")}
        strokeWidth={focused ? 1.6 : 1}
      />
    )
  },
  {
    id: 3,
    name: "Add",
    text: "Add",
    icon: (focused,size,color) => (
      <BadgePlus
        size={size ?? 20}
        color={color ??(focused ? "#0a0a0a" : "#a3a3a3")}
        strokeWidth={focused ? 1.6 : 1}
      />
    )
  },
  {
    id: 4,
    name: "ai",
    text: "Review",
    icon: (focused,size,color) => (
      <GitGraphIcon
        size={size ?? 20}
        color={color ??(focused ? "#0a0a0a" : "#a3a3a3")}
        strokeWidth={focused ? 1.6 : 1}
      />
    )
  },
    {
    id: 5,
    name: "profile",
    text: "Profile",
    icon: (focused,size,color) => (
      <UserRound
        size={size ?? 20}
        color={color ??(focused ? "#0a0a0a" : "#a3a3a3")}
        strokeWidth={focused ? 1.6 : 1}
      />
    )
  }
]


export const categorydynamicColors = [
  { btncolor: "#DB1818", colors: "#FCE8E8", darkColor:"#F39696"},
  { btncolor: "#E67129", colors: "#FCF0F8", darkColor:"#F3BA96"},
  { btncolor: "#E6AD29", colors: "#FCF6E8", darkColor:"#F3D796"},
  { btncolor: "#A4E629", colors: "#F5FCE8", darkColor:"#D2F396"},
  { btncolor:"#68E629",colors:"#EFFCE8", darkColor:"#B5F396"},
  { btncolor:"#29E6D3",colors:"#E8FCFA", darkColor:"#96F3E9"},
  { btncolor:"#29C0E6",colors:"#E8F8FC", darkColor:"#96E0F3"},
  { btncolor:"#245AD1",colors:"#E8EFFC", darkColor:"#96B3F3"},
  { btncolor:"#5529E6",colors:"#EDE8FC", darkColor:"#AC96F3"},
  { btncolor:"#A129E6",colors:"#F5E8FC", darkColor:"#D196F3"},
  { btncolor:"#e629ca",colors:"#fce8f9", darkColor:"#F396E5"}

]

type CategoryIconsProps={
  id:number,
  symbol:IconFn
  name:string
}


export const CategoryIcons:CategoryIconsProps[] = [
  {
    id: 1,
    name:"Utensils",
    symbol:(focused,color,size)=>(
      <Utensils
        size={size ?? 20}
        color={color ?? (focused ? '#60a5fa' : '#ffffff')}
      />
    )},
  {
    id: 2,
    name:"Fuel",
    symbol:(focused,color,size)=>(
      <Fuel
        size={size?? 20}
        color={color ?? (focused ? '#60a5fa' : '#ffffff')}
      />

    )
    
  },
  {
    id: 3,
    name:"Hamburger",
    symbol:(focused,color,size)=>(
      
      <Hamburger
        size={size?? 20}
        color={color ?? (focused ? '#60a5fa' : '#ffffff')}
      />
    )
    
  },
  {
    id: 4,
    name:"CarTaxi",
    symbol:(focused,color,size)=>( 
      <CarTaxiFrontIcon
        size={size?? 20}
        color={color ?? (focused ? '#60a5fa' : '#ffffff')}
      />
    )
    
  },
  {
    id: 5,
    name:"GlobeCheck",
    symbol:(focused,color,size)=>(
      <GlobeCheck
        size={size?? 20}
        color={color ?? (focused ? '#60a5fa' : '#ffffff')}
      />
    )
  },
  {
    id: 6,
    name:"Toolbox",
    symbol:(focused,color,size)=>(
      <Toolbox
        size={size?? 20}
        color={color ?? (focused ? '#60a5fa' : '#ffffff')}
      />
    )
  },
  {
    id: 7,
    name:"Clapperboard",
    symbol:(focused,color,size)=>(
      <Clapperboard
        size={size?? 20}
        color={color ?? (focused ? '#60a5fa' : '#ffffff')}
      />
    )
  },
  {
    id: 8,
    name:"Hospital",
    symbol:(focused,color,size)=>(
      <Hospital
        size={size?? 20}
        color={color ?? (focused ? '#60a5fa' : '#ffffff')}
      />
    )
  }
]



export const AccountIcons:CategoryIconsProps[] = [
  {
    id: 1,
    name:"Landmark",
    symbol:(focused,color,size)=>(
      <Landmark
       size={size ?? 20}
        color={color ?? (focused ? '#60a5fa' : '#ffffff')}
      />
    )},
  {
    id: 2,
    name:"BankNote",
    symbol:(focused,color,size)=>(
      <BanknoteIcon
        size={size ?? 20}
        color={color ?? (focused ? '#60a5fa' : '#ffffff')}
      />
    )
  },
  {
    id: 3,
    name:"Wallet",
    symbol:(focused,color,size)=>(
      <Wallet
        size={size ?? 20}
        color={color ?? (focused ? '#60a5fa' : '#ffffff')}
      />
    )
    
  },
  {
    id: 4,
    name:"CreditCard",
    symbol:(focused,color,size)=>( 
      <CreditCard
        size={size ?? 20}
        color={color ?? (focused ? '#60a5fa' : '#ffffff')}
      />
    )
  }
]


export const monthData=[
  {
    id:"1",
    month:"Jan"
  },
  {
    id:"2",
    month:"Feb"
  },{
    id:"3",
    month:"March"
  },{
    id:"4",
    month:"April"
  },{
    id:"5",
    month:"May"
  },{
    id:"6",
    month:"June"
  },{
    id:"7",
    month:"July"
  },{
    id:"8",
    month:"Aug"
  },{
    id:"9",
    month:"Sep"
  },{
    id:"10",
    month:"Oct"
  },{
    id:"11",
    month:"Nov"
  },{
    id:"12",
    month:"Dec"
  }

]

export const countryCurrencyData = [
  {
    country: "India",
    code: "IN",
    currency: "Indian Rupee",
    currencyCode: "INR",
    symbol: "₹",
  },
  {
    country: "United States",
    code: "US",
    currency: "US Dollar",
    currencyCode: "USD",
    symbol: "$",
  },
  {
    country: "United Kingdom",
    code: "GB",
    currency: "British Pound",
    currencyCode: "GBP",
    symbol: "£",
  },
  {
    country: "European Union",
    code: "EU",
    currency: "Euro",
    currencyCode: "EUR",
    symbol: "€",
  },
  {
    country: "Japan",
    code: "JP",
    currency: "Japanese Yen",
    currencyCode: "JPY",
    symbol: "¥",
  },
  {
    country: "China",
    code: "CN",
    currency: "Chinese Yuan",
    currencyCode: "CNY",
    symbol: "¥",
  },
  {
    country: "Canada",
    code: "CA",
    currency: "Canadian Dollar",
    currencyCode: "CAD",
    symbol: "C$",
  },
  {
    country: "Australia",
    code: "AU",
    currency: "Australian Dollar",
    currencyCode: "AUD",
    symbol: "A$",
  },
  {
    country: "Singapore",
    code: "SG",
    currency: "Singapore Dollar",
    currencyCode: "SGD",
    symbol: "S$",
  },
  {
    country: "United Arab Emirates",
    code: "AE",
    currency: "UAE Dirham",
    currencyCode: "AED",
    symbol: "د.إ",
  },
  {
    country: "Saudi Arabia",
    code: "SA",
    currency: "Saudi Riyal",
    currencyCode: "SAR",
    symbol: "﷼",
  },
  {
    country: "Pakistan",
    code: "PK",
    currency: "Pakistani Rupee",
    currencyCode: "PKR",
    symbol: "₨",
  },
  {
    country: "Bangladesh",
    code: "BD",
    currency: "Bangladeshi Taka",
    currencyCode: "BDT",
    symbol: "৳",
  },
  {
    country: "Sri Lanka",
    code: "LK",
    currency: "Sri Lankan Rupee",
    currencyCode: "LKR",
    symbol: "Rs",
  },
  {
    country: "Nepal",
    code: "NP",
    currency: "Nepalese Rupee",
    currencyCode: "NPR",
    symbol: "रू",
  },
];

export const PERIODS: { key: Period; label: string }[] = [
  { key: 'day', label: 'Today' },
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'quarter', label: 'Quarter' },
  { key: 'year', label: 'Year' },
];
