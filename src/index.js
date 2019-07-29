import './app';

if (typeof window !== 'undefined') {
    document.body.appendChild(
        document.createElement('wc-ap')
    );
}