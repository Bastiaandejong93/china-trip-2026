import { Marker, RouteSegment } from '@/data/schemas/scrollytelling'
import { storyIcons } from './icons'

export const chinaMarkers: Marker[] = [
    {
        id: 'shanghai',
        coords: [121.4737, 31.2304],
        title: 'Shanghai',
        description: 'The Modern Metropolis',
        type: 'city',
        icon: storyIcons['city_shanghai']?.path,
        color: '#B52719'
    },
    {
        id: 'wuhan',
        coords: [114.3055, 30.5928],
        title: 'Wuhan',
        description: 'The Thoroughfare of Nine Provinces',
        type: 'city',
        icon: storyIcons['city_wuhan']?.path,
        color: '#D8B45A'
    },
    {
        id: 'zhangjiajie',
        coords: [110.4792, 29.1170],
        title: 'Zhangjiajie',
        description: 'Avatar Mountains',
        type: 'landmark',
        icon: storyIcons['city_zhangjiajie']?.path,
        color: '#57786A'
    },
    {
        id: 'chongqing',
        coords: [106.5516, 29.5630],
        title: 'Chongqing',
        description: 'The Mountain City',
        type: 'city',
        icon: storyIcons['city_chongqing']?.path,
        color: '#B52719'
    },
    {
        id: 'chengdu',
        coords: [104.0668, 30.5728],
        title: 'Chengdu',
        description: 'Home of Pandas',
        type: 'city',
        icon: storyIcons['city_chengdu']?.path,
        color: '#57786A'
    },
    {
        id: 'dali',
        coords: [100.2297, 25.5916],
        title: 'Dali',
        description: 'Ancient Kingdom',
        type: 'city',
        icon: storyIcons['city_dali']?.path,
        color: '#D8B45A'
    },
    {
        id: 'lijiang',
        coords: [100.2330, 26.8721],
        title: 'Lijiang',
        description: 'Naxi Culture',
        type: 'city',
        icon: storyIcons['city_lijiang']?.path,
        color: '#B52719'
    },
    {
        id: 'beijing',
        coords: [116.4074, 39.9042],
        title: 'Beijing',
        description: 'The Imperial Capital',
        type: 'city',
        icon: storyIcons['city_beijing']?.path,
        color: '#B52719'
    }
]

export const chinaRoute: RouteSegment[] = [
    {
        id: 'grand-tour-route',
        from: [121.4737, 31.2304], // Shanghai
        to: [116.4074, 39.9042],   // Beijing
        type: 'custom',
        color: '#D8B45A',
        width: 3,
        animated: true,
        // This is a simplified representation. In a real app, we'd have detailed coordinates for the path.
        // For now, MapView will draw straight lines between points if we provide them as a list in metadata or similar.
        // But MapView expects RouteSegment to be just from/to? 
        // Wait, MapView.tsx uses `createRouteGeoJSON` which takes `RouteSegment[]`.
        // And `RouteSegment` has `from` and `to`.
        // So I need to define segments between each city.
    }
]

// Let's define the full route as segments
export const fullChinaRoute: RouteSegment[] = [
    { from: [121.4737, 31.2304], to: [114.3055, 30.5928], type: 'train', id: 'shanghai-wuhan' },
    { from: [114.3055, 30.5928], to: [110.4792, 29.1170], type: 'train', id: 'wuhan-zhangjiajie' },
    { from: [110.4792, 29.1170], to: [106.5516, 29.5630], type: 'train', id: 'zhangjiajie-chongqing' },
    { from: [106.5516, 29.5630], to: [104.0668, 30.5728], type: 'train', id: 'chongqing-chengdu' },
    { from: [104.0668, 30.5728], to: [100.2297, 25.5916], type: 'flight', id: 'chengdu-dali' },
    { from: [100.2297, 25.5916], to: [100.2330, 26.8721], type: 'train', id: 'dali-lijiang' },
    { from: [100.2330, 26.8721], to: [116.4074, 39.9042], type: 'flight', id: 'lijiang-beijing' }
]
