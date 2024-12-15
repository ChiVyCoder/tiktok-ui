import PropTypes from 'prop-types';
import classNames from 'classnames';
import { forwardRef } from 'react';
import { useState } from 'react';
import images from '~/assets/images';
import styles from './Image.module.scss';

function Image({ src, alt, className, fallback: customFallback = images.noimg, ...props }, ref) {
    const handleFallback = () => {
        setFallback(customFallback);
    };
    const [fallback, setFallback] = useState('');
    return (
        <img
            className={classNames(styles.wrapper, className)}
            alt={alt}
            ref={ref}
            src={fallback || src}
            {...props}
            onError={handleFallback}
        />
    );
}

// Image.propTypes = {
//     src: PropTypes.string,
//     className: PropTypes.string,
//     fallback: PropTypes.string,
//     alt: PropTypes.string,
// };

export default forwardRef(Image);
