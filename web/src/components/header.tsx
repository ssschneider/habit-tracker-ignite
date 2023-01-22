import logoImage from "../assets/logo.svg";
import { Plus, X } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';
import NewHabitForm from "./newHabitForm";

const Header = () => {
	return (
		<header className="w-full max-w-3xl mx-auto flex items-center justify-between">
			<img src={logoImage} alt="Habits Tracker logo" />

			<Dialog.Root>
				<Dialog.Trigger 
					className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 cursor-pointer hover:scale-105 duration-500 focus:outline-none focus:ring-violet-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-background">
					<Plus size={20} className="text-violet-500" />
					Novo hábito
				</Dialog.Trigger>

				<Dialog.Portal>
					<Dialog.Overlay className="w-screen h-screen bg-background/90 fixed inset-0"/>

					<Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
						<Dialog.Close className="absolute text-zinc-600 right-6 top-6 hover:text-zinc-200 focus:outline-none focus:ring-0 focus:text-red-500 f">
							<X size={24} aria-label="Fechar" />
						</Dialog.Close>
						<Dialog.Title className="text-3xl leading-tight font-extrabold">
							Criar Hábito
						</Dialog.Title>

						<NewHabitForm />
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>

			
		</header>
	);
};

export default Header;
