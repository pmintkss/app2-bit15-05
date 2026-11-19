import { Image, StyleSheet, Text, View } from 'react-native'

type CardProps = {
    id: number,
    name: string,
    price?: number,
    image: string
}

export default function Card({ id, name, price, image }: CardProps) {
    return (
        <View style={cardStyle.box}>
            <Image source={{ uri: image }} style={cardStyle.image} />
            <Text style={cardStyle.text}>{name}</Text>
            {price !== undefined && (
                <View style={cardStyle.priceBox}>
                    <Text style={cardStyle.priceText}>{price} บาท</Text>
                </View>
            )}
        </View>
    )
}

const cardStyle = StyleSheet.create({
    box: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2a8330",
        gap: 12,
        margin: 10,
        borderRadius: 16,
        padding: 10
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    text: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFDD0',
    },
    priceBox: {
        backgroundColor: "#ffffff",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    priceText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#287c47',
    }
})
