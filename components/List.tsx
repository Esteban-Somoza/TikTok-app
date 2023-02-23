import React from 'react';

export const List = ({ items, mt }: { items: string[], mt: boolean }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
      {items.map(footer => (
        <p key={footer} className='text-gray-400 text-sm hover:underline cursor-pointer'>
          {footer}
        </p>
      ))}
    </div>
  );
};
