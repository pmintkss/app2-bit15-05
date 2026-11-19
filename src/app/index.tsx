import {View, Text, FlatList} from 'react-native'
import products from '../products.json'

export default function App(){
  return(
    <View>
      <Text>รายการสินค้า</Text>
      <FlatList
      // ข้อมูลที่จะเรนเดอร์
      data={products}
      // คีย์หลัก
      keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}