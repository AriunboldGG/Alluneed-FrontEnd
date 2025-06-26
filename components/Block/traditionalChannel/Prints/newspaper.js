import { useState } from "react";
import { useBag } from '@/context/BagContext';

// Sample company data
const companies = [
  {
    name: "Company 1",
    description: "This is the description for company one.",
    address: "1234 Street Name, City, Country",
  },
  {
    name: "Company 2",
    description: "This is the description for company two.",
    address: "5678 Avenue Name, City, Country",
  },
  {
    name: "Company 3",
    description: "This is the description for company one.",
    address: "1234 Street Name, City, Country",
  },
  {
    name: "Company 4",
    description: "This is the description for company two.",
    address: "5678 Avenue Name, City, Country",
  },
  {
    name: "Company 5",
    description: "This is the description for company one.",
    address: "1234 Street Name, City, Country",
  },
  {
    name: "Company 6",
    description: "This is the description for company two.",
    address: "5678 Avenue Name, City, Country",
  },
  // Add more company objects as needed
];

const Index = () => {
  const { bag, addToBag } = useBag();
  const inBag = bag.some((i) => i.type === 'newspaper');

  return (
    <div className="flex flex-col min-h-[400px] w-full p-3 space-y-3">
      <div className="flex flex-row text-2xl justify-center mb-4">
        <div>Үйлчилгээний газрууд</div>
      </div>
      <div className="space-y-3">
        {companies.map((company, index) => (
          <div
            key={index}
            className="flex flex-col p-4 border border-gray-300 rounded-lg"
          >
            <div className="text-xl font-bold">{company.name}</div>
            <div className="text-md mt-2">{company.description}</div>
            <div className="text-sm mt-1 text-gray-600">{company.address}</div>
          </div>
        ))}
      </div>
      <button
        className={`mt-4 inline-block rounded px-12 py-3 text-sm font-medium text-center w-full max-w-[250px] transition ${inBag ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-pink-600 text-white hover:bg-pink-700'}`}
        disabled={inBag}
        onClick={() => addToBag('newspaper', { name: 'Newspaper', type: 'newspaper' })}
      >
        {inBag ? 'Added to Bag' : 'Add to Bag'}
      </button>
    </div>
  );
};

export default Index;
