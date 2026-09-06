import Button from './Button';

export default function AccessNotice({ title, summary, details, onSignIn, footer, titleClassName = 'text-primary' }) {
    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8 bg-gray-50 border border-gray-100 my-8 max-w-2xl mx-auto">
            <h3 className={titleClassName}>{title}</h3>
            <p className="mt-2">{summary}</p>
            <p className="mt-4 max-w-md">{details}</p>
            {footer && <p className="mt-6">{footer}</p>}
            {onSignIn && (
                <Button onClick={onSignIn} variant="primary" className="mt-6">
                    Sign in
                </Button>
            )}
        </div>
    );
}
