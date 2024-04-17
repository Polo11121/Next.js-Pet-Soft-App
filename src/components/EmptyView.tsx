type EmptyViewProps = {
  text: string;
};

export const EmptyView = ({ text }: EmptyViewProps) => (
  <div className="h-full w-full flex justify-center items-center">
    <p className="text-2xl font-medium">{text}</p>
  </div>
);
