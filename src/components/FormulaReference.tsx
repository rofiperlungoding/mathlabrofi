import React, { useState } from 'react';
import { mathFormulas, getFormulasByCategory, searchFormulas } from '../data/formulas';
import { MathFormula } from './MathFormula';
import { Search, BookOpen, Calculator, Zap, Lightbulb, Wrench, DollarSign, Atom, TrendingUp, Ruler, Filter, Sparkles, X } from 'lucide-react';
import { Formula } from '../types';

export const FormulaReference: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null);

  const categories = [
    { id: 'all', name: 'All', icon: BookOpen, color: 'bg-neutral-500 dark:bg-neutral-600' },
    { id: 'algebra', name: 'Algebra', icon: Calculator, color: 'bg-blue-500 dark:bg-blue-600' },
    { id: 'geometry', name: 'Geometry', icon: Ruler, color: 'bg-green-500 dark:bg-green-600' },
    { id: 'calculus', name: 'Calculus', icon: TrendingUp, color: 'bg-purple-500 dark:bg-purple-600' },
    { id: 'trigonometry', name: 'Trigonometry', icon: Zap, color: 'bg-red-500 dark:bg-red-600' },
    { id: 'statistics', name: 'Statistics', icon: BookOpen, color: 'bg-yellow-500 dark:bg-yellow-600' },
    { id: 'physics', name: 'Physics', icon: Atom, color: 'bg-indigo-500 dark:bg-indigo-600' },
    { id: 'chemistry', name: 'Chemistry', icon: Lightbulb, color: 'bg-teal-500 dark:bg-teal-600' },
    { id: 'engineering', name: 'Engineering', icon: Wrench, color: 'bg-orange-500 dark:bg-orange-600' },
    { id: 'business', name: 'Business', icon: DollarSign, color: 'bg-emerald-500 dark:bg-emerald-600' },
    { id: 'finance', name: 'Finance', icon: DollarSign, color: 'bg-cyan-500 dark:bg-cyan-600' }
  ];

  const getFilteredFormulas = (): Formula[] => {
    let formulas = selectedCategory === 'all' 
      ? mathFormulas 
      : getFormulasByCategory(selectedCategory);
    
    if (searchQuery.trim()) {
      formulas = searchFormulas(searchQuery);
    }
    
    return formulas;
  };

  const filteredFormulas = getFilteredFormulas();

  const getCategoryStats = () => {
    const stats = categories.map(category => {
      const count = category.id === 'all' 
        ? mathFormulas.length 
        : getFormulasByCategory(category.id).length;
      return { ...category, count };
    });
    return stats;
  };

  const categoryStats = getCategoryStats();

  return (
    <div className="container-main section-padding">
      <div className="space-component">
        {/* Main Title */}
        <div className="text-center space-element mb-8">
          <h2 className="text-display mb-4">
            Formula Reference
          </h2>
          <p className="text-subtitle max-w-2xl mx-auto">
            Comprehensive collection of mathematical formulas with detailed explanations
          </p>
        </div>

        {/* Compact Search Section */}
        <div className="card p-6 mb-16">
          {/* Minimalist Search Bar */}
          <div className="max-w-3xl mx-auto mb-6">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search formulas, categories, or concepts..."
                className="w-full pl-12 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Compact Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === category.id
                      ? `${category.color} text-white shadow-sm dark:shadow-black/30`
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  <IconComponent size={12} />
                  <span>{category.name}</span>
                  <span className="text-xs opacity-75">({category.count})</span>
                </button>
              );
            })}
          </div>

          {/* Active Filters - Compact */}
          {(searchQuery || selectedCategory !== 'all') && (
            <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <span className="text-xs text-neutral-500 dark:text-neutral-400">Active:</span>
              
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                  <Search size={10} />
                  "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery('')}
                    className="hover:text-blue-900 dark:hover:text-blue-100"
                  >
                    <X size={10} />
                  </button>
                </span>
              )}
              
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full">
                  <Filter size={10} />
                  {categories.find(c => c.id === selectedCategory)?.name}
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="hover:text-purple-900 dark:hover:text-purple-100"
                  >
                    <X size={10} />
                  </button>
                </span>
              )}
              
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 underline ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Full Width Content */}
      <div className="w-full">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-title">
              {selectedCategory === 'all' ? 'All Formulas' : 
               categoryStats.find(c => c.id === selectedCategory)?.name || 'Formulas'}
            </h3>
            <p className="text-body mt-1">
              {filteredFormulas.length} formula{filteredFormulas.length !== 1 ? 's' : ''} found
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
              <span>{mathFormulas.length} total formulas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full"></div>
              <span>{categories.length - 1} categories</span>
            </div>
          </div>
        </div>

        {/* Formula Grid - Full Width */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFormulas.map((formula) => {
            const category = categoryStats.find(c => c.id === formula.category);
            const IconComponent = category?.icon || BookOpen;
            
            return (
              <div
                key={formula.id}
                className="card card-hover p-8 cursor-pointer group interactive"
                onClick={() => setSelectedFormula(formula)}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${category?.color || 'bg-neutral-500 dark:bg-neutral-600'} text-white group-hover:scale-105 transition-transform`}>
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-neutral-900 dark:text-white group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                        {formula.name}
                      </h3>
                      <p className="text-caption uppercase tracking-wide font-medium">
                        {formula.category}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="formula-box mb-6 bg-white dark:bg-neutral-850 border border-neutral-100 dark:border-neutral-700 p-4 rounded-xl">
                  <div className="formula-scroll" style={{ overflowX: 'auto', maxWidth: '100%' }}>
                    <MathFormula latex={formula.latex} displayMode />
                  </div>
                </div>
                
                <p className="text-body line-clamp-3 mb-6">
                  {formula.description}
                </p>
                
                <div className="flex items-center justify-between text-caption">
                  <div className="flex items-center gap-4">
                    <span>{formula.variables.length} variables</span>
                    <span>{formula.examples.length} examples</span>
                  </div>
                  <div className="text-neutral-900 dark:text-neutral-200 font-medium">
                    View Details →
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredFormulas.length === 0 && (
          <div className="text-center py-16">
            <Search size={48} className="text-neutral-400 dark:text-neutral-600 mx-auto mb-6" />
            <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-3">No formulas found</h3>
            <p className="text-body mb-6">
              {searchQuery 
                ? `No formulas match "${searchQuery}". Try a different search term.`
                : 'This category doesn\'t have any formulas yet.'
              }
            </p>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="btn btn-secondary"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>

      {/* Formula Detail Modal - Fixed Positioning */}
      {selectedFormula && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50 overflow-hidden">
          <div 
            className="bg-white dark:bg-neutral-800 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="p-8 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className={`p-4 rounded-2xl ${
                    categoryStats.find(c => c.id === selectedFormula.category)?.color || 'bg-neutral-500 dark:bg-neutral-600'
                  } text-white`}>
                    {React.createElement(
                      categoryStats.find(c => c.id === selectedFormula.category)?.icon || BookOpen,
                      { size: 28 }
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-medium text-neutral-900 dark:text-white">{selectedFormula.name}</h2>
                    <p className="text-body capitalize">{selectedFormula.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFormula(null)}
                  className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 text-3xl w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-8 space-section">
              {/* Formula Display */}
              <div className="space-element">
                <h3 className="text-title mb-6">Formula</h3>
                <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-850 dark:to-neutral-800 p-8 rounded-2xl border-l-4 border-neutral-900 dark:border-neutral-200">
                  <div className="formula-container" style={{ maxWidth: '100%', overflowX: 'auto' }}>
                    <MathFormula latex={selectedFormula.latex} displayMode />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-element">
                <h3 className="text-title mb-6">Description</h3>
                <div className="bg-neutral-50 dark:bg-neutral-850 p-6 rounded-2xl">
                  <p className="text-body leading-relaxed">{selectedFormula.description}</p>
                </div>
              </div>

              {/* Variables */}
              <div className="space-element">
                <h3 className="text-title mb-6">Variables & Parameters</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {selectedFormula.variables.map((variable, index) => (
                    <div key={index} className="flex items-start gap-6 p-6 bg-neutral-50 dark:bg-neutral-850 rounded-2xl border-l-4 border-blue-300 dark:border-blue-500">
                      <div className="font-mono text-xl text-neutral-900 dark:text-white font-bold min-w-[3rem] bg-white dark:bg-neutral-800 px-3 py-2 rounded-xl">
                        {variable.symbol}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-neutral-900 dark:text-white mb-2">{variable.name}</div>
                        <div className="text-body mb-2">{variable.description}</div>
                        {variable.units && (
                          <div className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full inline-block">
                            Units: {variable.units}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Examples */}
              {selectedFormula.examples.length > 0 && (
                <div className="space-element">
                  <h3 className="text-title mb-6">Worked Examples</h3>
                  <div className="space-component">
                    {selectedFormula.examples.map((example, index) => (
                      <div key={index} className="border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden">
                        <div className="bg-green-50 dark:bg-green-900/20 p-6 border-b border-green-200 dark:border-green-800">
                          <h4 className="font-medium text-neutral-900 dark:text-white flex items-center gap-3">
                            <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </span>
                            {example.description}
                          </h4>
                        </div>
                        
                        <div className="p-6 space-component dark:bg-neutral-800">
                          <div>
                            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Given Values:</span>
                            <div className="mt-3 flex flex-wrap gap-3">
                              {Object.entries(example.given).map(([key, value]) => (
                                <span key={key} className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-mono">
                                  {key} = {value}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-neutral-50 dark:bg-neutral-850 p-6 rounded-2xl border dark:border-neutral-700">
                            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 block mb-3">Calculation:</span>
                            <div className="formula-container" style={{ maxWidth: '100%', overflowX: 'auto' }}>
                              <MathFormula latex={example.latex} displayMode />
                            </div>
                          </div>
                          
                          <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-2xl border border-green-200 dark:border-green-800">
                            <span className="text-sm font-medium text-green-800 dark:text-green-300">Solution: </span>
                            <span className="font-bold text-green-900 dark:text-green-200">{example.solution}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};