import React, { FC } from 'react';
import { Avatar, Text, Flex, TFlexProps } from '../..';
import { getShortAddress } from './helpers';
import { TAvatarSizes } from '../Avatar/Avatar';
import { Copy } from '../Copy/Copy';

export const addressAvatarTestId = 'address-avatar';
export const copyTestId = 'address-avatar-copy';

interface IAddressAvatarProps extends TFlexProps {
    address: string;
    avatarSize?: TAvatarSizes;
    name?: string;
    isShort?: boolean;
    addressWithCopy?: boolean;
    alias?: string;
}

export const AddressAvatar: FC<IAddressAvatarProps> = ({
    address,
    avatarSize = 'large',
    name,
    isShort,
    alias,
    addressWithCopy = false,
    ...rest
}) => {
    const displayAddress =
        typeof alias === 'string'
            ? alias
            : isShort
            ? getShortAddress(address)
            : address;

    return (
        <Flex alignItems="center" {...rest} data-testid={addressAvatarTestId}>
            <Avatar address={address} variantSize={avatarSize} />
            <Flex
                ml="$10"
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
            >
                {name && (
                    <Text variant="footnote1" color="basic.$500">
                        {name}
                    </Text>
                )}
                {addressWithCopy ? (
                    <Copy
                        inititialTooltipLabel="Copy address"
                        copiedTooltipLabel="Copied!"
                        text={address}
                        data-testid={copyTestId}
                    >
                        <Text variant="body2" color="standard.$0">
                            {displayAddress}
                        </Text>
                    </Copy>
                ) : (
                    <Text variant="body2" color="standard.$0">
                        {displayAddress}
                    </Text>
                )}
            </Flex>
        </Flex>
    );
};
