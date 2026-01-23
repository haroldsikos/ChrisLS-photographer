import { useEffect } from 'react';

const useImageProtection = () => {
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            if ((e.target as HTMLElement).tagName === 'IMG') {
                e.preventDefault();
            }
        };

        const handleDragStart = (e: DragEvent) => {
            if ((e.target as HTMLElement).tagName === 'IMG') {
                e.preventDefault();
            }
        };

        // Add global listeners
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('dragstart', handleDragStart);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('dragstart', handleDragStart);
        };
    }, []);
};

export default useImageProtection;
