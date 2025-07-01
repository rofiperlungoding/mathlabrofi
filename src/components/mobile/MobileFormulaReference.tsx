import React, { useState } from 'react';
import { MobileLayout } from './MobileLayout';
import { MobileCard } from './MobileCard';
import { Search, Filter, X } from 'lucide-react';
import { mathFormulas, getFormulasByCategory } from '../../data/formulas';
import { MathFormula } from '../MathFormula';
import { Formula } from '../../types';

export const MobileFormulaReference: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null);
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'algebra', name: 'Algebra' },
    { id: 'geometry', name: 'Geometry' },
    { id: 'calculus', name: 'Calculus' },
    { id: 'trigonometry', name: 'Trigonometry' },
    { id: 'statistics', name: 'Statistics' }
  ];
  
  // Get filtered formulas
  const getFilteredFormulas = (): Formula[] => {
    let formulas = selectedCategory === 'all' 
      ? mathFormulas 
      : getFormulasByCategory(selectedCategory);
    
    if (searchQuery.trim()) {
      formulas = formulas.filter(formula => 
        formula.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formula.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formula.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return formulas;
  };
  
  const filteredFormulas = getFilteredFormulas();
  
  return (
    <MobileLayout title="Formulas">
      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search formulas..."
            className="w-full py-2 pl-10 pr-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
      
      {/* Category Pills */}
      <div className="px-4 overflow-x-auto">
        <div className="flex gap-2 pb-4 whitespace-nowrap">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                selectedCategory === category.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Formulas List */}
      <div className="p-4 space-y-3">
        {filteredFormulas.length > 0 ? (
          <>
            <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
              {filteredFormulas.length} formula{filteredFormulas.length !== 1 ? 's' : ''} found
            </div>
            
            {filteredFormulas.map((formula) => (
              <MobileCard
                key={formula.id}
                title={formula.name}
                description={formula.description}
                onClick={() => setSelectedFormula(formula)}
              />
            ))}
          </>
        ) : (
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 text-center border border-neutral-200 dark:border-neutral-700">
            <Search size={32} className="mx-auto mb-3 text-neutral-400" />
            <h3 className="font-medium text-neutral-900 dark:text-white mb-2">No formulas found</h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm">
              Try adjusting your search or category filter
            </p>
          </div>
        )}
      </div>
      
      {/* Formula Detail Modal */}
      {selectedFormula && (
        <div className="fixed inset-0 bg-black/50 z-50 flex flex-col">
          <div className="bg-white dark:bg-neutral-800 flex-1 rounded-t-xl mt-16 overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 px-4 py-3 flex items-center justify-between">
              <h2 className="font-medium text-neutral-900 dark:text-white">
                {selectedFormula.name}
              </h2>
              <button 
                onClick={() => setSelectedFormula(null)}
                className="w-8 h-8 flex items-center justify-center text-neutral-500 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-700 rounded-full"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-4 space-y-6">
              {/* Category Badge */}
              <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                {selectedFormula.category}
              </div>
              
              {/* Formula */}
              <div className="bg-neutral-50 dark:bg-neutral-850 p-4 rounded-lg overflow-x-auto border border-neutral-200 dark:border-neutral-700">
                <MathFormula latex={selectedFormula.latex} displayMode />
              </div>
              
              {/* Description */}
              <div>
                <h3 className="font-medium text-neutral-900 dark:text-white mb-2">Description</h3>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                  {selectedFormula.description}
                </p>
              </div>
              
              {/* Variables */}
              <div>
                <h3 className="font-medium text-neutral-900 dark:text-white mb-2">Variables</h3>
                <div className="space-y-2">
                  {selectedFormula.variables.map((variable, index) => (
                    <div key={index} className="bg-white dark:bg-neutral-850 p-3 rounded-lg border border-neutral-200 dark:border-neutral-700">
                      <div className="flex items-center gap-2">
                        <div className="font-mono font-bold bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-blue-700 dark:text-blue-300">
                          {variable.symbol}
                        </div>
                        <span className="font-medium text-neutral-900 dark:text-white">
                          {variable.name}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">
                        {variable.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MobileLayout>
  );
};