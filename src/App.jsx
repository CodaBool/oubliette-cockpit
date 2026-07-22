import { useEffect, useRef, useState } from "react"

const RELATIONSHIPS = {
  categories: {
    1: "Companions",
    2: "Professional",
    3: "Romantic",
    4: "Obligation & Debt",
    5: "Rivalry",
    6: "Ambivalent",
    7: "Shared Trauma",
    8: "Unlikely Bond",
  },
  results: {
    1: {
      0: "They have been through hell together before.",
      1: "They are close friends and confidants.",
      2: "They have similar hobbies or interests.",
      3: "They have an unspoken code of mutual protection.",
      4: "One is trying to corrupt the other.",
      5: "They trust each other with their lives.",
      6: "They serve as a moral compass for the other.",
      7: "They are thick as thieves.",
      8: "One reminds the other of a lost friend or family member.",
      9: "They have a pact to get back somewhere together, no matter what.",
    },
    2: {
      0: "They worked together at the same company.",
      1: "One is a mentor to the other.",
      2: "They cover for the other's mistakes.",
      3: "One got the job the other wanted.",
      4: "They are professional rivals in direct competition.",
      5: "One is clearly better at the job, and it's a sore point.",
      6: "They share complaints about management or the current assignment.",
      7: "They collaborated on a successful—and profitable—project.",
      8: "Their methods and philosophies clash constantly.",
      9: "They have a shared history of failing together.",
    },
    3: {
      0: "They are secretly involved with each other.",
      1: "They are in a relationship together.",
      2: "They are former lovers, and it's still awkward.",
      3: "They had a bad breakup in their past.",
      4: "There is an unspoken attraction between them.",
      5: "They have a friends with benefits arrangement.",
      6: "They're stuck in a will-they-won't-they dynamic.",
      7: "They hooked up once, and it's complicated.",
      8: "One is trying to win the other back.",
      9: "They are trying to keep things strictly professional.",
    },
    4: {
      0: "One saved the other's life, creating a life debt.",
      1: "One knows a deeply damaging secret about the other.",
      2: "One is blackmailing the other.",
      3: "They owe the same dangerous people or corporation money.",
      4: "One took the fall for the other's mistake or crime.",
      5: "There is an unresolved debt between them.",
      6: "They are bound by a past betrayal.",
      7: "One helped the other escape the law.",
      8: "They are caught in the same conspiracy.",
      9: "There is a major unspoken obligation between them.",
    },
    5: {
      0: "They have a begrudging mutual respect for each other.",
      1: "They are bitter enemies with a shared history.",
      2: "They are former friends turned rivals.",
      3: "They are in a friendly competition with each other.",
      4: "One is a one-sided rival, but the other is oblivious.",
      5: "They want what the other has.",
      6: "They compete over nearly everything.",
      7: "They are from opposing factions or organizations.",
      8: "They are forced to work together despite their animosity.",
      9: "One blames the other for a personal loss.",
    },
    6: {
      0: "They have never really talked much, but are now stuck together.",
      1: "There is mutual indifference toward them.",
      2: "They run in different social circles.",
      3: "They know of each other, but that's it.",
      4: "One is actively avoiding the other.",
      5: "Something unspoken makes them awkward around each other.",
      6: "Their communication is stilted and formal.",
      7: "One is a minor celebrity to the other, but they don't know it.",
      8: "They have nothing in common to bond over.",
      9: "They get the feeling they've met before, but can't place where.",
    },
    7: {
      0: "They are the only survivors of a past disaster.",
      1: "They both witnessed something they shouldn't have.",
      2: "One saved the other from a horrific monster.",
      3: "They survived the same medical experiment.",
      4: "They share the memory of friend's death.",
      5: "They were both part of a failed expedition with a high body count.",
      6: "They are bonded by a terrifying encounter from their past.",
      7: "They both suffer from a recurring nightmare from a shared event.",
      8: "One knows the other's most shameful secret.",
      9: "They are both running from the same past mistake.",
    },
    8: {
      0: "One comes from privilege, the other from poverty.",
      1: "They are two vastly different people who found a mutual interest.",
      2: "One is the other's hero, but they don't know it.",
      3: "They are both hiding a secret.",
      4: "They constantly get on each other's nerves, but they work well together.",
      5: "They were rivals, but have since gained respect for one another.",
      6: "One is a jaded veteran, the other a naive rookie.",
      7: "They are united by a common enemy.",
      8: "They are the only ones who can perform a specific task together.",
      9: "One is the other's confidant for a secret they are both keeping.",
    },
  },
}


const SIMPLE_TRAITS = {
  aesthetics: [
    "All Business, All the Time.",
    "Streetwear",
    "Band Tees",
    "Paint it Black",
    "Athleisure",
    "Crisp and Ironed",
    "Casual Comfort",
    "Authentic Vintage",
    "All the Rage",
    "Work Uniform",
    "Oversized Hoodie",
    "Island Floral",
    "Everything Tailored",
    "Function Over Fashion",
    "Cargo Pockets",
    "Jeans and Tees",
    "Trapped in 2009",
    "Grunge Minimalist",
    "Y2K",
    "Denim on Denim",
  ],
  ideology: [
    "Everything has a rational explanation rooted in science.",
    "Individuals can make a difference.",
    "You ascribe to a specific political ideology.",
    "A specific religion guides you.",
    "Morality is black and white.",
    "You believe in fate and it directly impacts your life.",
    "Belief in higher powers such as astrology, spirituality, etc.",
    "Free will is the only truth.",
    "There are deep truths that others are not aware of. The answers are out there.",
    "You believe in the power of community.",
  ],
  physique: [
    "Athletic",
    "Muscles",
    "Curvy",
    "Lanky",
    "Small",
    "Rigid",
    "Stout",
    "Towering",
    "Robust",
    "Ample Body",
  ],
  virtue: [
    "Honest",
    "Honorable",
    "Cautious",
    "Humble",
    "Courageous",
    "Merciful",
    "Disciplined",
    "Serene",
    "Gregarious",
    "Tolerant",
  ],
  face: [
    "Bony",
    "Broken",
    "Chiseled",
    "Elongated",
    "Dimpled",
    "Perfect",
    "Round",
    "Sharp",
    "Memorable",
    "Forgettable",
  ],
  speech: [
    "Blunt",
    "Gravelly",
    "Booming",
    "Precise",
    "Cryptic",
    "Squeaky",
    "Formal",
    "Accented",
    "Droning",
    "Choppy",
  ],
  misfortune: [
    "Abandoned",
    "Defrauded",
    "Addicted",
    "Demoted",
    "Blackmailed",
    "Discredited",
    "Condemned",
    "Disowned",
    "Cursed",
    "Exiled",
  ],
}

function cx(...classes) {
  return classes.filter(Boolean).join(" ")
}

function rollD10Digit() {
  return Math.floor(Math.random() * 10)
}

function useFadeSwap(initialValue = null, duration = 120) {
  const [value, setValue] = useState(initialValue)
  const [visible, setVisible] = useState(Boolean(initialValue))

  function swap(nextValue) {
    setVisible(false)
    window.setTimeout(() => {
      setValue(nextValue)
      setVisible(true)
    }, duration)
  }

  return {
    value,
    visible,
    swap,
    hasValue: value !== null && value !== "",
  }
}

function FadeText({ show, children }) {
  return (
    <div
      className={cx(
        "transition-opacity duration-150",
        show ? "opacity-100" : "opacity-0",
      )}
    >
      {children}
    </div>
  )
}

// Reusable Modal Component
function SelectionModal({
  title,
  options,
  onSelect,
  onClose,
  subtitle,
  footer,
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={onClose}
    >
      <section
        className="flex max-h-[90dvh] w-full max-w-lg flex-col border border-stone-800 bg-stone-950 p-6 shadow-2xl"
        onMouseDown={e => e.stopPropagation()}
      >
        <div className="border-b border-stone-800 pb-2 mb-2">
          <h2 className="text-md font-black uppercase tracking-widest text-stone-100">
            {title}
          </h2>
        </div>
        {subtitle && (
          <div className="text-sm text-stone-200 mb-3">
            {subtitle}
          </div>
        )}
        <div className="overflow-y-auto grid grid-cols-1 gap-2">
          {options.map(opt =>
            opt.href ? (
              <a
                key={opt.id}
                href={opt.href}
                target="_blank"
                rel="noreferrer"
                className="border border-stone-800 bg-black/40 px-4 py-3 text-left text-sm font-bold uppercase tracking-wider text-stone-300 transition hover:border-amber-400 hover:text-amber-300"
              >
                {opt.label}
              </a>
            ) : (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelect?.(opt.id)}
                className="border border-stone-800 bg-black/40 px-4 py-3 text-left text-sm font-bold uppercase tracking-wider text-stone-300 transition hover:border-amber-400 hover:text-amber-300"
              >
                {opt.label}
              </button>
            ),
          )}
        </div>
        {footer && (
          <p className="mt-4 border-t border-stone-800 pt-4 text-sm text-stone-400 text-center">
            {footer}
          </p>
        )}
      </section>
    </div>
  )
}

function D20Icon() {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinejoin="round"
    >
      <path d="M32 4 57 22 48 54H16L7 22 32 4Z" />
      <path d="m7 22 25 9 25-9M16 54l16-23 16 23M32 4v27" />
      <path d="m7 22 9 32M57 22l-9 32" />
    </svg>
  )
}

function TraitModal({ options, onResult, onClose }) {
  const [traitId, setTraitId] = useState(null)
  const [result, setResult] = useState(null)
  const tableContainerRef = useRef(null)

  const activeTrait = options.find(option => option.id === traitId)
  const entries = traitId ? SIMPLE_TRAITS[traitId] : []

  useEffect(() => {
    if (traitId !== "aesthetics" || !result) return

    const selectedRow = tableContainerRef.current?.querySelector(
      `[data-roll="${result.roll}"]`,
    )
    selectedRow?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }, [result, traitId])

  function selectResult(index) {
    const nextResult = {
      category: activeTrait.label,
      roll: index + 1,
      text: entries[index],
    }
    setResult(nextResult)
    onResult(nextResult)
  }

  function selectTrait(nextTraitId) {
    setTraitId(nextTraitId)
    setResult(null)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="trait-modal-title"
      onMouseDown={onClose}
    >
      <section
        className="flex max-h-[90dvh] w-full max-w-2xl flex-col border border-stone-800 bg-stone-950 p-6 shadow-2xl"
        onMouseDown={event => event.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between border-b border-stone-800 pb-3">
          <div className="flex items-center gap-3">
            <h2
              id="trait-modal-title"
              className="text-md font-black uppercase tracking-widest text-stone-100"
            >
              {activeTrait ? activeTrait.label : "Choose a Trait"}
            </h2>
            {activeTrait && (
              <button
                type="button"
                onClick={() => selectResult(Math.floor(Math.random() * entries.length))}
                aria-label={`Roll randomly on the ${activeTrait.label} table`}
                title="Roll randomly"
                className="inline-flex items-center justify-center border border-amber-400/60 bg-amber-400/10 p-2 text-amber-300 transition hover:border-amber-300 hover:bg-amber-400/20 hover:text-amber-200"
              >
                <D20Icon />
              </button>
            )}
          </div>
          {activeTrait && (
            <button
              type="button"
              onClick={() => {
                setTraitId(null)
                setResult(null)
              }}
              className="border border-stone-700 bg-stone-900 px-4 py-2 text-xs font-black uppercase tracking-widest text-stone-300 transition hover:border-amber-400 hover:text-amber-300"
            >
              Back
            </button>
          )}
        </div>

        {!activeTrait ? (
          <div className="grid grid-cols-1 gap-2 overflow-y-auto">
            {options.map(option => (
              <button
                key={option.id}
                type="button"
                onClick={() => selectTrait(option.id)}
                className="border border-stone-800 bg-black/40 px-4 py-3 text-left text-sm font-bold uppercase tracking-wider text-stone-300 transition hover:border-amber-400 hover:text-amber-300"
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : (
          <>
            <div
              ref={tableContainerRef}
              className="min-h-0 overflow-y-auto border border-stone-800"
            >
              <table className="w-full border-collapse text-left text-sm">
                <tbody>
                  {entries.map((entry, index) => (
                    <tr
                      key={entry}
                      data-roll={index + 1}
                      className={cx(
                        "border-b border-stone-800 last:border-b-0",
                        result?.roll === index + 1
                          ? "bg-amber-400/15 text-amber-200"
                          : "bg-black/30",
                      )}
                    >
                      <td className="w-14 border-r border-stone-800 px-3 py-2 text-center font-black text-amber-300/80">
                        {index + 1}
                      </td>
                      <td className="px-4 py-2">
                        {entry}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default function App() {
  const relationshipResult = useFadeSwap(null)
  const traitsResult = useFadeSwap(null)

  const [activeModal, setActiveModal] = useState(null) // 'relationship' | 'traits' | 'links' | null

  function handleSelectRelationship(categoryId) {
    const relationshipRoll = String(rollD10Digit())
    relationshipResult.swap({
      category: `${categoryId}. ${RELATIONSHIPS.categories[categoryId]}`,
      text: `[${relationshipRoll}] ${RELATIONSHIPS.results[categoryId][relationshipRoll]}`,
    })
    setActiveModal(null)
  }

  function handleSelectTrait(result) {
    traitsResult.swap({
      category: result.category,
      text: `[${result.roll}] ${result.text}`,
    })
  }

  // Formatting options for Modals
  const relationshipOptions = Object.entries(RELATIONSHIPS.categories).map(
    ([id, label]) => ({ id, label: `${id}. ${label}` }),
  )
  const traitOptions = [
    { id: "aesthetics", label: "Aesthetics" },
    { id: "physique", label: "Physique" },
    { id: "face", label: "Face" },
    { id: "speech", label: "Speech" },
    { id: "virtue", label: "Virtue" },
    { id: "ideology", label: "Ideology" },
    { id: "misfortune", label: "Misfortune" },
  ]
  const linkOptions = [
    {
      id: "facilitator-playlist",
      label: "Spotify Playlist for Facilitator Prep",
      href: "https://open.spotify.com/playlist/4f3s6cgJq1XBTIx5SPCg0A",
    },
    {
      id: "session-playlist",
      label: "Spotify Playlist for Session",
      href: "https://open.spotify.com/playlist/4f3s6cgJq1XBTIx5SPCg0A",
    },
    { id: "itch", label: "Itch", href: "https://codabool.itch.io" },
    { id: "artist", label: "Artist link", href: "https://lemos.itch.io" },
  ]

  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-stone-950 font-sans text-stone-100">
      <section className="relative z-10 grid flex-1 grid-cols-1 gap-8 px-6 py-8 sm:grid-cols-2">
        <Quadrant>
          <button
            type="button"
            onClick={() => setActiveModal("relationship")}
            className="w-full border border-stone-700 bg-stone-900 py-3 text-sm font-black uppercase tracking-widest transition hover:border-amber-400 hover:text-amber-300"
          >
            Relationship
          </button>

          <ResultBlock className="relative h-40 items-start overflow-hidden">
            <FadeText show={relationshipResult.visible}>
              {relationshipResult.hasValue ? (
                <div className="w-full">
                  <p className="text-[0.7rem] font-black uppercase tracking-[0.18em] text-amber-300/80">
                    {relationshipResult.value.category}
                  </p>
                  <p className="mt-2 text-sm font-bold leading-6 text-stone-100 md:text-base">
                    {relationshipResult.value.text}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-stone-500">Awaiting selection...</p>
              )}
            </FadeText>
          </ResultBlock>
        </Quadrant>

        <Quadrant>
          <button
            type="button"
            onClick={() => setActiveModal("traits")}
            className="w-full border border-stone-700 bg-stone-900 py-3 text-sm font-black uppercase tracking-widest transition hover:border-amber-400 hover:text-amber-300"
          >
            Traits
          </button>

          <ResultBlock className="relative h-40 items-start overflow-hidden">
            <FadeText show={traitsResult.visible}>
              {traitsResult.hasValue ? (
                <div className="w-full">
                  <p className="text-[0.7rem] font-black uppercase tracking-[0.18em] text-amber-300/80">
                    {traitsResult.value.category}
                  </p>
                  <p className="mt-2 text-sm font-bold leading-6 text-stone-100 md:text-base">
                    {traitsResult.value.text}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-stone-500">Awaiting selection...</p>
              )}
            </FadeText>
          </ResultBlock>
        </Quadrant>
      </section>

      <div className="relative z-10 px-6 pb-8">
        <button
          type="button"
          onClick={() => setActiveModal("links")}
          className="w-full border border-stone-700 bg-stone-900 py-3 text-sm font-black uppercase tracking-widest transition hover:border-amber-400 hover:text-amber-300"
        >
          Links
        </button>
      </div>

      {/* Modals */}
      {activeModal === "relationship" && (
        <SelectionModal
          title="Have your player roll d8 for a category, then select the corresponding item below"
          options={relationshipOptions}
          subtitle="Everyone should have at least 1 relation (either from someone else's roll or from their own). If desired, have some players roll an extra, but don't overwhelm your players. Allow for rerolls."
          onSelect={handleSelectRelationship}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "traits" && (
        <TraitModal
          options={traitOptions}
          onResult={handleSelectTrait}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "links" && (
        <SelectionModal
          title="Links"
          options={linkOptions}
          footer="Liminal Horror is copyright by Goblin Archives LLC"
          onClose={() => setActiveModal(null)}
        />
      )}
    </main>
  )
}

function Quadrant({ children }) {
  return (
    <article className="relative flex flex-col justify-center border border-stone-800 bg-stone-950/90 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
      <div className="flex min-h-0 flex-1 flex-col justify-start gap-4">
        {children}
      </div>
    </article>
  )
}

function ResultBlock({ children, muted = false, className = "" }) {
  return (
    <div
      className={cx(
        "flex flex-col border border-stone-800 bg-black/35 p-4 text-sm leading-6",
        muted && "text-stone-600",
        className,
      )}
    >
      {children}
    </div>
  )
}

