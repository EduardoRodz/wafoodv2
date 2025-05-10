
import React from 'react';

interface AdditionalCommentsProps {
  comments: string;
  setComments: (comments: string) => void;
}

export const AdditionalComments: React.FC<AdditionalCommentsProps> = ({
  comments,
  setComments
}) => {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium">Comentarios adicionales <span className="text-gray-400">(opcional)</span></label>
      <textarea
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        placeholder="Instrucciones especiales, llamar al llegar, etc."
        className="w-full p-2 border border-gray-300 rounded"
        rows={2}
      />
    </div>
  );
};
