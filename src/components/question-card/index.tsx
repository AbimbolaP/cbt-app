'use client';

interface QuestionCardProps {
  primary: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string; 
  selected: string | null;
  onSelect: (selected: string) => void;
}

export const QuestionCard = ({
  primary,
  option1,
  option2,
  option3,
  option4,
  selected,
  onSelect,
}: QuestionCardProps) => {

  const options = [option1, option2, option3, option4];

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-2xl mt-10 shadow-md w-full md:w-[40rem]">
      <div className="text-lg font-semibold">{primary}</div>

      <div className="flex flex-col gap-4">
        {options.map((option, id) => (
          <button
            key={id}
            onClick={() => onSelect(option)}
            className={`text-left p-4 rounded-lg border transition-all duration-300 cursor-pointer
              ${
                selected === option
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
