import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Edit, Trash, Plus, Check, X } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: string;
  items: any[];
}

interface CategoryEditorProps {
  categories: Category[];
  onChange: (categories: Category[]) => void;
  onMove: (index: number, direction: 'up' | 'down') => void;
}

const CategoryEditor: React.FC<CategoryEditorProps> = ({ categories, onChange, onMove }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newCategory, setNewCategory] = useState<Category>({
    id: '',
    name: '',
    icon: '🍽️',
    items: []
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // Validar el ID para asegurar que sea único
  const validateId = (id: string, skipIndex?: number): boolean => {
    return !categories.some((cat, idx) => 
      idx !== skipIndex && cat.id.toLowerCase() === id.toLowerCase());
  };

  // Generar un ID basado en el nombre
  const generateIdFromName = (name: string): string => {
    const baseId = name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    // Si el ID ya existe, añadir un número
    let newId = baseId;
    let counter = 1;
    
    while (!validateId(newId)) {
      newId = `${baseId}-${counter}`;
      counter++;
    }

    return newId;
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setNewCategory({ ...categories[index] });
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setShowAddForm(false);
    setNewCategory({
      id: '',
      name: '',
      icon: '🍽️',
      items: []
    });
  };

  const handleSaveEdit = () => {
    if (!newCategory.name.trim()) {
      alert('El nombre de la categoría es obligatorio');
      return;
    }

    // Si se está editando, actualizar la categoría existente
    if (editingIndex !== null) {
      // Si el ID ha cambiado, validar que sea único
      if (newCategory.id !== categories[editingIndex].id && !validateId(newCategory.id, editingIndex)) {
        alert('El ID debe ser único');
        return;
      }

      const updatedCategories = [...categories];
      updatedCategories[editingIndex] = { ...newCategory };
      onChange(updatedCategories);
    } 
    // Si se está añadiendo, crear una nueva categoría
    else if (showAddForm) {
      // Generar un ID si no se ha proporcionado
      const categoryToAdd = { 
        ...newCategory,
        id: newCategory.id.trim() || generateIdFromName(newCategory.name)
      };

      if (!validateId(categoryToAdd.id)) {
        alert('El ID debe ser único');
        return;
      }

      onChange([...categories, categoryToAdd]);
    }

    handleCancelEdit();
  };

  const handleDelete = (index: number) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar la categoría "${categories[index].name}"?`)) {
      const updatedCategories = [...categories];
      updatedCategories.splice(index, 1);
      onChange(updatedCategories);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setNewCategory({
      ...newCategory,
      name,
      // Solo actualizar el ID automáticamente si estamos añadiendo y el usuario no ha introducido un ID
      id: showAddForm && !newCategory.id ? generateIdFromName(name) : newCategory.id
    });
  };

  const commonEmojiOptions = ['🍽️', '🍕', '🍔', '🍣', '🥗', '🍰', '🍷', '🍹', '🍪', '🥤', '🍺', '🍱', '🥘', '🍲', '🥪'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Categorías del Menú</h2>
        
        {!showAddForm && editingIndex === null && (
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingIndex(null);
            }}
            className="flex items-center gap-1 text-sm py-1 px-3 bg-gray-100 hover:bg-gray-200 rounded"
          >
            <Plus size={16} /> Agregar Categoría
          </button>
        )}
      </div>

      {/* Formulario para añadir/editar */}
      {(showAddForm || editingIndex !== null) && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium mb-3">
            {editingIndex !== null ? 'Editar Categoría' : 'Añadir Nueva Categoría'}
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Nombre</label>
              <input
                type="text"
                value={newCategory.name}
                onChange={handleNameChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Ej: Platos Principales"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">ID (slug)</label>
              <input
                type="text"
                value={newCategory.id}
                onChange={(e) => setNewCategory({ ...newCategory, id: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Ej: platos-principales"
                disabled={editingIndex !== null} // No permitir cambiar el ID al editar
              />
              <p className="text-xs text-gray-500 mt-1">
                El ID se usa en URLs y debe ser único. Se generará automáticamente si lo dejas en blanco.
              </p>
            </div>
            
            <div>
              <label className="block text-sm mb-1">Icono</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {commonEmojiOptions.map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setNewCategory({ ...newCategory, icon: emoji })}
                    className={`w-8 h-8 flex items-center justify-center text-lg rounded hover:bg-gray-200 ${
                      newCategory.icon === emoji ? 'bg-blue-100 border border-blue-400' : 'bg-white border border-gray-300'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={newCategory.icon}
                onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Emoji o texto"
                maxLength={2}
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="py-1 px-3 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="py-1 px-3 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de categorías */}
      {categories.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Icono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platos
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category, index) => (
                <tr key={category.id} className={editingIndex === index ? 'bg-blue-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap text-2xl">
                    {category.icon}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {category.id}
                    </code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {category.items.length} platos
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => onMove(index, 'up')}
                        disabled={index === 0}
                        className={`p-1 rounded hover:bg-gray-100 ${index === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title="Mover arriba"
                      >
                        <ArrowUp size={18} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => onMove(index, 'down')}
                        disabled={index === categories.length - 1}
                        className={`p-1 rounded hover:bg-gray-100 ${index === categories.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title="Mover abajo"
                      >
                        <ArrowDown size={18} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleEdit(index)}
                        className="p-1 rounded hover:bg-gray-100"
                        title="Editar"
                      >
                        <Edit size={18} className="text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="p-1 rounded hover:bg-gray-100"
                        title="Eliminar"
                      >
                        <Trash size={18} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">No hay categorías definidas.</p>
          <button 
            onClick={() => setShowAddForm(true)}
            className="mt-2 text-blue-600 hover:underline"
          >
            Añadir la primera categoría
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryEditor; 