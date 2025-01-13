type Props = {
  name: string;
};

const CallArea = ({ name }: Props) => {
  return (
    <div className="absolute top-12 w-full p-1">
      {/* container */}
      <div className="flex flex-col items-center">
        {/* call information */}
        <div className="flex flex-col items-center gap-y-1">
          <h1 className="text-white text-lg">
            <b>{name}</b>
          </h1>
          <span className="text-dark_text_1">Ringing...</span>
      
        </div>
      </div>
    </div>
  );
};

export default CallArea;
