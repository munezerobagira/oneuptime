import React, { FunctionComponent, ReactElement } from 'react';
import './Badge.scss';
import VariantIcon, { IconProps } from './VariantIcon';

interface BadgeProps extends IconProps {
    text: string;
}
const Badge: FunctionComponent<BadgeProps> = ({
    variant,
    text,
}: BadgeProps): ReactElement => {
    return (
        <div className={`badge badge-${variant}`}>
            <em>{text}</em>
            <VariantIcon variant={variant} />
        </div>
    );
};

export default Badge;
