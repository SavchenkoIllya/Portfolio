//external packages
import { TextScramble } from "@a7sc11u/scramble";

export default function Header({preloader}) {
  const play = !preloader && true

  return (
    <div className="text-4xl sm:text-6xl flex flex-wrap justify-end text-white bg-black min-h-[60px]">
      <TextScramble
        as="a"
        href="/#bio"
        className="mr-4 blink"
        play={play}
        speed={0.2}
        scramble={8}
        step={1}
        stepInterval={1}
        seed={3}
        seedInterval={10}
        text="Biography"
      />
      <TextScramble
        as="a"
        href="/#projects"
        className="mr-4 blink"
        play={play}
        speed={0.4}
        scramble={8}
        step={1}
        stepInterval={1}
        seed={3}
        seedInterval={10}
        text="works"
      />
      <TextScramble
        as="a"
        href="/#contacts"
        className="mr-4 blink"
        play={play}
        speed={0.4}
        scramble={8}
        step={1}
        stepInterval={1}
        seed={3}
        seedInterval={10}
        text="contacts"
      />
    </div>
  );
}
