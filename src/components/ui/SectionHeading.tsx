type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  const alignClass = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`max-w-2xl space-y-4 ${alignClass}`}>
      {eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
      ) : null}
      <h2 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-[2.5rem]">{title}</h2>
      {description ? <p className="text-base leading-relaxed text-muted sm:text-lg">{description}</p> : null}
    </div>
  );
}
