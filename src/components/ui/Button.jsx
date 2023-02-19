import classNames from "classnames";

function Button({
  children,
  rounded,
  round,
  outline,
  primary,
  secondary,
  success,
  warning,
  danger,
  className,
  as: Tag="button",
  ...rest
}) {
  const classes = classNames(
    "flex items-center px-3 py-1 border transition",
    {
      "border-slate-500": primary,
      "border-gray-900": secondary,
      "border-green-500": success,
      "border-yellow-400": warning,
      "border-red-500": danger,
      "bg-slate-500 hover:bg-slate-600 text-white": primary && !outline,
      "bg-slate-200 hover:bg-slate-300 text-slate-700": secondary && !outline,
      "bg-green-500 text-white": success && !outline,
      "bg-yellow-400 text-white": warning && !outline,
      "bg-red-500 text-white": danger && !outline,
      "rounded-full": round,
      "rounded-lg": rounded,
      "bg-white hover:bg-slate-100": outline,
      "text-slate-500": outline && primary,
      "text-gray-900": outline && secondary,
      "text-green-500": outline && success,
      "text-yellow-400": outline && warning,
      "text-red-500": outline && danger,
    },
    className
  );
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}

Button.propTypes = {
  checkVariationValue: ({ primary, secondary, success, warning, danger }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!warning) +
      Number(!!success) +
      Number(!!danger);
    if (count > 1) {
      return new Error(
        "Only one of primary, secondard, warning, success or danger can be true"
      );
    }
  },
};

export default Button;
