const CARD_TONES = {
  blue: {
    wrap: 'bg-indigo-50 border border-indigo-100 shadow-sm',
    label: 'text-indigo-500',
    value: 'text-indigo-700'
  },
  green: {
    wrap: 'bg-emerald-50 border border-emerald-100 shadow-sm',
    label: 'text-emerald-500',
    value: 'text-emerald-700'
  },
  purple: {
    wrap: 'bg-violet-50 border border-violet-100 shadow-sm',
    label: 'text-violet-500',
    value: 'text-violet-700'
  },
  amber: {
    wrap: 'bg-amber-50 border border-amber-100 shadow-sm',
    label: 'text-amber-500',
    value: 'text-amber-700'
  },
  orange: {
    wrap: 'bg-orange-50 border border-orange-100 shadow-sm',
    label: 'text-orange-500',
    value: 'text-orange-700'
  },
  teal: {
    wrap: 'bg-teal-50 border border-teal-100 shadow-sm',
    label: 'text-teal-500',
    value: 'text-teal-700'
  },
  pink: {
    wrap: 'bg-rose-50 border border-rose-100 shadow-sm',
    label: 'text-rose-500',
    value: 'text-rose-700'
  },
  neutral: {
    wrap: 'bg-slate-50 border border-slate-100 shadow-sm',
    label: 'text-slate-500',
    value: 'text-slate-700'
  }
};

export const Card = ({ tone, label, value }) => {
  const styles = CARD_TONES[tone] || CARD_TONES.neutral;

  return (
    <div className={`${styles.wrap} rounded-xl p-4`}>
      <p className={`${styles.label} text-sm font-medium`}>{label}</p>
      <p className={`${styles.value} text-3xl font-bold`}>{value}</p>
    </div>
  );
};

export const Label = ({ children }) => (
  <label className="block text-sm font-medium text-slate-600 mb-1">{children}</label>
);

export const Input = ({ label, ...props }) => (
  <div>
    <Label>{label}</Label>
    <input
      {...props}
      className="w-full px-4 py-2 border border-stone-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
    />
  </div>
);

export const Select = ({ label, children, ...props }) => (
  <div>
    <Label>{label}</Label>
    <select
      {...props}
      className="w-full px-4 py-2 border border-stone-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
    >
      {children}
    </select>
  </div>
);

export const TextArea = ({ label, ...props }) => (
  <div>
    <Label>{label}</Label>
    <textarea
      {...props}
      className="w-full px-4 py-2 border border-stone-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
    />
  </div>
);

export const Button = ({ variant = 'primary', className = '', ...props }) => {
  const palette = {
    primary: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm',
    secondary: 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 shadow-sm',
    danger: 'bg-rose-500 hover:bg-rose-400 text-white shadow-sm'
  };

  return (
    <button
      {...props}
      className={`${palette[variant]} font-medium px-4 py-2 rounded-xl transition disabled:opacity-50 ${className}`}
    />
  );
};
