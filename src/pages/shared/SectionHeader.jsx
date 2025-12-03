import React from 'react';

const SectionHeader = ({header, headerLine}) => {
    return (
        <div className='text-center py-5 lg:py-10'>
            <h1 className='text-2xl md:text-4xl'>{header}</h1>
            <h1 className='text-sm'>{headerLine}</h1>
        </div>
    );
};

export default SectionHeader;