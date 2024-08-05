import { menuItems, MenuItem } from "./menuItems";

const Sidebar: React.FC<{ isOpen: boolean; closeSidebar: () => void }> = ({ isOpen, closeSidebar }) => {
  const renderIcon = (iconName: string) => {
    const iconPath = `${process.env.PUBLIC_URL}/assets/icons/${iconName}.svg`;
    return <img src={iconPath} alt={iconName} className="w-6 h-6 mr-3" />;
  };

  const handleMenuItemClick = () => {
    if (window.innerWidth < 640) {
      closeSidebar();
    }
  };

  return (
    <div
      className={`bg-neutral-900 text-white h-full fixed sm:static top-0 left-0 
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0 w-64 transition-transform duration-300 z-50`}
    >
      <div className="p-4">
        <img src="/assets/icons/logo.svg" className="h-16 w-16 object-contain rounded-lg" />
      </div>
      <nav className="flex-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item: MenuItem, index: number) => (
          <div key={index} className="mb-2" onClick={handleMenuItemClick}>
            <a
              href={item.href}
              className={`flex items-center py-2 px-4 text-lg no-underline
                 ${item.name === 'Marketplace' ? 'text-orange-400' : 'text-white'
                }`}
            >
              {renderIcon(item.icon)}
              {item.name}
            </a>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar