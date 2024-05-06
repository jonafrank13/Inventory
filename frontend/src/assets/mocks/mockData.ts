import { Item, Store, Warehouse } from "../types/types";

export const mockStoreData: Store[] = [
    {
      id: 1,
      name: "Chennai",
      retail_revenue: "1232.2",
      profit: "1120.2",
      items: [
        {
          id: 1,
          units: 10,
        },
        {
          id: 2,
          units: 100,
        },
        {
          id: 4,
          units: 5,
        },
      ],
    },
    {
      id: 2,
      name: "Delhi",
      retail_revenue: "4322.4",
      profit: "2232.5",
      items: [
        {
          id: 2,
          units: 50,
        },
        {
          id: 4,
          units: 10,
        },
      ],
    },
    {
      id: 3,
      name: "Bangalore",
      retail_revenue: "3245.4",
      profit: "8654.1",
      items: [
        {
          id: 1,
          units: 3,
        },
        {
          id: 2,
          units: 41,
        },
        {
          id: 3,
          units: 15,
        },
      ],
    },
    {
      id: 4,
      name: "Hyderabad",
      retail_revenue: "657.9",
      profit: "2432",
      items: [
        {
          id: 3,
          units: 12,
        },
        {
          id: 4,
          units: 67,
        },
      ],
    },
  ];
  
 export const mockItemsData: Item[] = [
    {
      id: 1,
      name: "Item 1",
      retail_cost: "10.2",
      wholesale_cost: "8",
      units: 10000,
    },
    {
      id: 2,
      name: "Item 2",
      retail_cost: "15",
      wholesale_cost: "10",
      units: 10000,
    },
    {
      id: 3,
      name: "Item 3",
      retail_cost: "20",
      wholesale_cost: "15",
      units: 20000,
    },
    {
      id: 4,
      name: "Item 4",
      retail_cost: "15",
      wholesale_cost: "9",
      units: 9000,
    },
  ];
  
 export const mockWarehouseData: Warehouse[] = [
    {
      id: 1,
      name: "Chennai Outer",
      wholesale_revenue: "1000",
      profit: "1120.2",
      items: [
        {
          id: 2,
          units: 10,
        },
        {
          id: 4,
          units: 50,
        },
      ],
    },
    {
      id: 2,
      name: "Delhi Outer",
      wholesale_revenue: "4533",
      profit: "2232.5",
      items: [
        {
          id: 1,
          units: 50,
        },
        {
          id: 2,
          units: 67,
        },
        {
          id: 4,
          units: 8,
        },
      ],
    },
    {
      id: 3,
      name: "Bangalore Outer",
      wholesale_revenue: "57856.3",
      profit: "8654.1",
      items: [
        {
          id: 3,
          units: 10,
        },
      ],
    },
    {
      id: 4,
      name: "Hyderabad Outer",
      wholesale_revenue: "3232",
      profit: "2432",
      items: [
        {
          id: 1,
          units: 13,
        },
        {
          id: 4,
          units: 98,
        },
      ],
    },
  ];