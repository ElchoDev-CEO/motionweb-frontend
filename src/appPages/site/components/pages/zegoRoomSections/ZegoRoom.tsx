'use client';
import { useParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { v4 as uuid } from 'uuid';
import { useGetMeQuery } from '@/redux/api/me';
import { useDeleteCallRoomMutation } from '@/redux/api/course';
import { useUserRoleStore } from '@/stores/useUserRoleStore';
import { useScreenRecording } from '@/hooks/useScreenRecording';

const ZegoRoom = () => {
	const { roomId } = useParams();
	const roomID = String(roomId);
	const router = useRouter();
	const { stopRecording, downloadRecording } = useScreenRecording();
	const { isAdminOrMentor } = useUserRoleStore();
	const { data: session } = useGetMeQuery();
	const [deleteCallRoomMutation] = useDeleteCallRoomMutation();

	const handleDeleteCallRoom = async () => {
		const getRoomId = localStorage.getItem('roomId');
		if (!getRoomId) return;
		try {
			await deleteCallRoomMutation(Number(getRoomId));
		} catch (error) {
			console.error('Failed to delete call room:', error);
		}
	};

	let myMeeting: any = async (element: HTMLElement | null) => {
		const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID!);
		const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!;
		const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
			appID,
			serverSecret,
			roomID,
			uuid(),
			`${session?.results.firstName} ${session?.results.lastName}` ||
				'user' + Date.now(),
			720
		);

		const zp = ZegoUIKitPrebuilt.create(kitToken);
		zp.joinRoom({
			container: element,
			sharedLinks: [
				{
					name: 'Shareable link',
					url:
						window.location.protocol +
						'//' +
						window.location.host +
						window.location.pathname +
						'?roomID=' +
						roomID
				}
			],
			scenario: {
				mode: ZegoUIKitPrebuilt.VideoConference
			},
			showPreJoinView: false,
			onLeaveRoom: async () => {
				const lastRoute = localStorage.getItem('lastRoute')!;
				const path = lastRoute.startsWith('/') ? lastRoute : `/${lastRoute}`;
				router.push(path);
				if (isAdminOrMentor) {
					stopRecording();
					downloadRecording();
					await handleDeleteCallRoom();
					zp.destroy();
				} else {
					zp.destroy();
				}
			}
		});
	};

	return <div style={{ width: '100%', height: '100vh' }} ref={myMeeting}></div>;
};

export default ZegoRoom;
