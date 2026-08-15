/**
 * BirrStack Icon System — type declarations.
 *
 * BismiLLAH Ar-Rahman Ar-Raheem.
 */
export interface IconOptions {
    /** Icon size in pixels (default 24). */
    size?: number;
    /** Stroke width (default 2). */
    strokeWidth?: number;
    /** Fill mode (default 'none'). */
    fill?: string;
    /** Optional CSS class on the <svg> element. */
    class?: string;
}
/** Render an icon by name as an SVG string. Returns an empty span for unknown names. */
export declare function icon(name: string, opts?: IconOptions): string;
/** List all available icon names. */
export declare function listIcons(): string[];
/** Check whether an icon name exists in the registry. */
export declare function hasIcon(name: string): boolean;
//# sourceMappingURL=index.d.ts.map
