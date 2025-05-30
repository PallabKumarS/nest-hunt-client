interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div
      className={`mx-auto w-full max-w-[1600px] mt-4 px-4 md:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
