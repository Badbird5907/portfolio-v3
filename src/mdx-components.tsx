import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const components: MDXComponents = {
	h1: ({ children }) => (
		<h1 className="text-4xl md:text-5xl font-bold mb-6 mt-8 first:mt-0">
			{children}
		</h1>
	),
	h2: ({ children }) => (
		<h2 className="text-3xl md:text-4xl font-bold mb-4 mt-8">{children}</h2>
	),
	h3: ({ children }) => (
		<h3 className="text-2xl md:text-3xl font-bold mb-3 mt-6">{children}</h3>
	),
	h4: ({ children }) => (
		<h4 className="text-xl md:text-2xl font-bold mb-2 mt-4">{children}</h4>
	),
	p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
	a: ({ href, children }) => (
		<Link
			href={href as string}
			className="text-primary hover:underline transition-colors"
		>
			{children}
		</Link>
	),
	ul: ({ children }) => (
		<ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
	),
	ol: ({ children }) => (
		<ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
	),
	li: ({ children }) => <li className="ml-4">{children}</li>,
	blockquote: ({ children }) => (
		<blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
			{children}
		</blockquote>
	),
	code: ({ children, className }) => {
		const isInline = !className;
		if (isInline) {
			return (
				<code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary">
					{children}
				</code>
			);
		}
		return (
			<code className={className}>
				{children}
			</code>
		);
	},
	pre: ({ children }) => (
		<pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4 border border-border">
			{children}
		</pre>
	),
	hr: () => <hr className="my-8 border-border" />,
	img: ({ src, alt }) => (
		<img
			src={src}
			alt={alt}
			className="rounded-lg my-6 w-full object-cover"
		/>
	),
};

export function useMDXComponents(): MDXComponents {
	return components;
}