import { css } from '@rocket.chat/css-in-js';
import { Box, Button, Icon, Tag } from '@rocket.chat/fuselage';
import React, { FC, memo, useState } from 'react';

import { useTranslation } from '../../../../../../client/contexts/TranslationContext';
import { IOmnichannelCannedResponse } from '../../../../../../definition/IOmnichannelCannedResponse';

const Item: FC<{
	data: IOmnichannelCannedResponse;
	onClickItem: (e: any) => void;
	onClickUse: (e: any) => void;
}> = ({ data, onClickItem, onClickUse }) => {
	const t = useTranslation();

	const clickable = css`
		cursor: pointer;
	`;

	const [visibility, setVisibility] = useState(false);

	return (
		<Box
			pbs={16}
			pbe={12}
			pi={24}
			borderBlockEndWidth='2px'
			borderBlockEndColor='neutral-200'
			borderBlockEndStyle='solid'
			onClick={onClickItem}
			className={clickable}
			onMouseEnter={(): void => setVisibility(true)}
			onMouseLeave={(): void => setVisibility(false)}
		>
			<Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
				{/* This is not a good way to solve the problem */}
				<Box w='full' maxWidth='75%'>
					<Box fontScale='p2' withTruncatedText>
						!{data.shortcut}
					</Box>
					<Box fontScale='c1' color='info' withTruncatedText>
						{data.scope}
					</Box>
				</Box>
				<Box display='flex' flexDirection='row' alignItems='center'>
					<Button display={visibility ? 'block' : 'none'} small onClick={onClickUse}>
						{t('Use')}
					</Button>
					<Icon name='chevron-left' size={24} color='neutral-700' />
				</Box>
			</Box>
			<Box fontScale='p1' mbs='8px' color='info' withTruncatedText>
				"{data.text}"
			</Box>
			{data.tags && data.tags.length > 0 && (
				<Box display='flex' w='full' flexDirection='row' mbs='8px' flexWrap='wrap'>
					{data.tags.map((tag: string, idx: number) => (
						<Box key={idx} mie='4px' mbe='4px'>
							<Tag>{tag}</Tag>
						</Box>
					))}
				</Box>
			)}
		</Box>
	);
};

export default memo(Item);