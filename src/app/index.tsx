import { FlatList, StyleSheet, Text, View } from 'react-native'
import products from '../products.json'

import Card from '@/components/card'

export default function App(){
  return(
    <View style={styles.container}>
      <Text style={styles.header}>🛒รายการสินค้า🛒</Text>

      <FlatList
      // ข้อมูลที่จะเรนเดอร์
      data={products}

      // คีย์หลัก
      keyExtractor={(item) => item.id.toString()}

      // component ที่จะแสดงผล
      renderItem={({item}) => (
        <Card id={item.id} name={item.name} price={item.price} image={item.image} />
      )}

      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor:"#63b068"
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    color: '#eeeeee',
  },
})
