import * as Progress from "@radix-ui/react-progress";

interface ProgressbarProps {
    progress: number
}

const Progressbar = ({progress}: ProgressbarProps) => {
	return (
		<Progress.Root className="w-full h-3 bg-zinc-700 rounded-xl mt-4">
			<Progress.Indicator className="h-3 bg-violet-600 rounded-xl transition-all" style={{
        width: `${progress}%`
    }}/>
		</Progress.Root>
	);
};

export default Progressbar;
