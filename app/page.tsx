import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 140% at 50% 0%, rgba(201,224,74,0.06) 0%, rgba(20,20,20,0) 55%)",
        }}
      />

      <div className="relative flex flex-col items-center">
        <Image
          src="/YBC Official Logo 1.png"
          alt="YieldBackCash"
          width={96}
          height={96}
          className="object-cover"
          priority
        />

        <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold text-(--dash-text)">
          YieldBack.Cash
        </h1>

        <p className="mt-4 max-w-xl text-sm sm:text-base text-(--dash-text-muted)">
          Turns your yield-bearing collateral into tradable tokens, enabling you to leverage yield or
          earn a fixed interest rate
        </p>

        <div className="mt-9 flex w-full max-w-xs flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
          <a
            href="https://app.yieldback.cash"
            className="text-sm px-5 py-2.5 rounded-lg font-medium cursor-pointer bg-(--dash-accent) text-(--dash-accent-dark) transition-opacity hover:opacity-90"
          >
            Launch App
          </a>
          <a
            href="https://docs.yieldback.cash"
            className="text-sm px-5 py-2.5 rounded-lg border cursor-pointer text-(--dash-text-muted) border-(--dash-border-muted) bg-(--dash-surface) transition-colors hover:text-(--dash-text)"
          >
            Read the docs
          </a>
        </div>
      </div>
    </main>
  );
}
