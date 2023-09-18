import { useState } from "react";
import Checkbox from "./components/Checkbox";

function App() {
  const [passwordGen, setPasswordGen] = useState({
    length: 5,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });
  const [handleText, sethandleText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChangeUppercase = () => {
    setPasswordGen({
      ...passwordGen,
      uppercase: !passwordGen.uppercase,
    });
  };

  const handleChangeLowercase = () => {
    setPasswordGen({
      ...passwordGen,
      lowercase: !passwordGen.lowercase,
    });
  };

  const handleChangeNumbers = () => {
    setPasswordGen({
      ...passwordGen,
      numbers: !passwordGen.numbers,
    });
  };

  const handleChangeSymbols = () => {
    setPasswordGen({
      ...passwordGen,
      symbols: !passwordGen.symbols,
    });
  };

  const setPasswordLength = (val) => {
    setPasswordGen({
      ...passwordGen,
      length: val,
    });
  };

  function generatePassword() {
    const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const symbolsArray = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];

    const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
    const lowerCaseLetters = characterCodes.map((code) =>
      String.fromCharCode(code)
    );
    const upperCaseLetters = lowerCaseLetters.map((letter) =>
      letter.toUpperCase()
    );

    const { length, uppercase, lowercase, numbers, symbols } = passwordGen;

    const generateTheWord = (
      length,
      uppercase,
      lowercase,
      numbers,
      symbols
    ) => {
      const availableCharacters = [
        ...(lowercase ? lowerCaseLetters : []),
        ...(uppercase ? upperCaseLetters : []),
        ...(numbers ? numbersArray : []),
        ...(symbols ? symbolsArray : []),
      ];
      const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
      const characters = shuffleArray(availableCharacters).slice(0, length);
      sethandleText(characters.join(""));
      return characters;
    };

    generateTheWord(length, uppercase, lowercase, numbers, symbols);
  }

  return (
    <section className='bg-[121212]'>
      <main className='flex min-w-full items-center justify-center p-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 rounded-lg border-2 border-white bg-black'>
        <div className='max-w-xl lg:max-w-3xl'>
          <h1 className='mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl'>
            Password Generator
          </h1>

          <form action='#' className='w-full mt-8 grid grid-cols-2 gap-4'>
            <div className='flex justify-between py-[10px] col-span-6'>
              <div className='flex flex-col '>
                <label
                  htmlFor='Password'
                  className='block text-sm font-medium text-white'>
                  Password
                </label>

                <input
                  type='text'
                  value={handleText}
                  placeholder=''
                  autoComplete='off'
                  onChange={(e) => sethandleText(e.target.value)}
                  className='mt-1 w-full rounded-md border-[1px] border-gray-200 bg-black text-sm text-white shadow-sm '
                />
              </div>
              <button
                onClick={() => {
                  if (handleText.length > 0) {
                    navigator.clipboard.writeText(handleText);
                    setCopied(true);
                    setInterval(() => {
                      setCopied(false);
                    }, 2000);
                  }
                }}
                className='inline-block mx-auto shrink-0 rounded-md border border-blue-600 bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white'>
                {copied ? "Copied!" : "Copy text"}
              </button>
            </div>

            <div className='py-[10px] col-span-6 sm:col-span-3'>
              <label className='flex gap-4'>
                <span className='text-sm text-slate-200'>
                  Include uppercase letters
                </span>

                <Checkbox
                  value={passwordGen.uppercase}
                  onChange={handleChangeUppercase}
                />
              </label>
            </div>

            <div className='py-[10px] col-span-6 sm:col-span-3'>
              <label className='flex gap-4'>
                <span className='text-sm text-slate-200'>Include numbers</span>

                <Checkbox
                  value={passwordGen.numbers}
                  onChange={handleChangeNumbers}
                />
              </label>
            </div>

            <div className='py-[10px] col-span-6 sm:col-span-3'>
              <label className='flex gap-4'>
                <span className='text-sm text-slate-200'>
                  Include lowercase letters
                </span>

                <Checkbox
                  value={passwordGen.lowercase}
                  onChange={handleChangeLowercase}
                />
              </label>
            </div>

            <div className='py-[10px] col-span-6 sm:col-span-3'>
              <label className='flex gap-4'>
                <span className='text-sm text-slate-200'>Include symbols</span>

                <Checkbox
                  value={passwordGen.symbols}
                  onChange={handleChangeSymbols}
                />
              </label>
            </div>

            <div className='flex flex-col col-span-6'>
              <div className='col-span-3'>
                <label className='block text-sm font-medium text-slate-200'>
                  Password lenght
                </label>
              </div>
              <div className='col-span-6'>
                <input
                  type='number'
                  min='4'
                  max='20'
                  value={passwordGen.length}
                  onChange={(e) => setPasswordLength(e.target.value)}
                  className='mt-1 rounded-md border-gray-200 bg-white text-sm text-blue-700 font-bold shadow-sm'
                />
              </div>
            </div>

            <div className='flex justify-center pt-[20px] col-span-6'>
              <button
                onClick={generatePassword}
                className='inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'>
                Generate password
              </button>
            </div>
          </form>
        </div>
      </main>
    </section>
  );
}

export default App;
