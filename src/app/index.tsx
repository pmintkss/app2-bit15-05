/**
 * ============================================================================
 * ไฟล์: src/app/index.tsx
 * หน้าที่: หน้าหลักของแอปพลิเคชัน (Home Screen / Main Route)
 * ============================================================================
 * 
 * รายละเอียดการทำงาน:
 * - ทำหน้าที่เป็นหน้าเริ่มต้นของแอปพลิเคชัน (ตามระบบไฟล์ของ Expo Router)
 * - ดึงข้อมูลรายการสินค้าจากไฟล์ `products.json`
 * - คำนวณและสรุปจำนวนสินค้าทั้งหมด และแยกจำนวนตามแต่ละหมวดหมู่
 * - นำเสนอรายการสินค้าผ่าน `FlatList` พร้อมแสดงแผงสรุปจำนวนสินค้าด้านบน
 * - ใช้คอมโพเนนต์ `Card` ในการแสดงผลข้อมูลของสินค้าแต่ละรายการ (รวมถึงราคา หมวดหมู่ และสต็อก)
 */

// นำเข้า UI Components จาก React Native:
// - FlatList: คอมโพเนนต์สำหรับแสดงรายการข้อมูลขนาดยาวแบบมีประสิทธิภาพ (Lazy Loading และ Reusable Views)
// - StyleSheet: ตัวช่วยสร้างสไตล์ชีทสำหรับจัดรูปแบบความสวยงามและเลย์เอาต์
// - Text: คอมโพเนนต์สำหรับแสดงผลข้อความ
// - View: คอนเทนเนอร์พื้นฐานสำหรับครอบองค์ประกอบอื่น ๆ คล้าย <div> ใน HTML
import { FlatList, StyleSheet, Text, View } from 'react-native'

// นำเข้าข้อมูลรายการสินค้าจากไฟล์ JSON ในโปรเจกต์
import products from '../products.json'

// นำเข้าคอมโพเนนต์ Card ที่เราสร้างไว้สำหรับแสดงผลการ์ดสินค้าแต่ละชิ้น
import Card from '@/components/card'

/**
 * คอมโพเนนต์ App (หน้าหลัก)
 * @returns {JSX.Element} - โครงสร้างหน้าจอหลักที่มีหัวข้อ แผงสรุปหมวดหมู่ และรายการสินค้า
 */
export default function App() {
  /**
   * คำนวณจำนวนสินค้าแยกตามหมวดหมู่อัตโนมัติจากข้อมูลใน products.json
   * ผลลัพธ์ที่ได้จะเป็น Object เช่น: { "เครื่องดื่ม": 7, "ขนม": 3 }
   */
  const categoryCounts = products.reduce((acc, item) => {
    const category = item.category || 'อื่นๆ'
    acc[category] = (acc[category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  /**
   * ดึงรายชื่อหมวดหมู่ทั้งหมดออกมาเป็น Array ของคีย์ เพื่อนำไป map แสดงผล
   */
  const categories = Object.keys(categoryCounts)

  return (
    /* กล่องครอบหลักของหน้าจอ (Root Container) ครอบคลุมพื้นที่หน้าจอทั้งหมด */
    <View style={styles.container}>
      
      {/* ส่วนหัวข้อด้านบนของหน้าจอ แสดงข้อความ '🛒รายการสินค้า🛒' */}
      <Text style={styles.header}>🛒รายการสินค้า🛒</Text>

      {/* 
        แผงสรุปข้อมูลหมวดหมู่สินค้าและจำนวน:
        แสดงจำนวนรวมทั้งหมด และจำนวนแยกตามแต่ละหมวดหมู่
      */}
      <View style={styles.summaryContainer}>
        {/* ป้ายแสดงจำนวนสินค้าทั้งหมด */}
        <View style={styles.summaryBadgeTotal}>
          <Text style={styles.summaryBadgeLabel}>ทั้งหมด</Text>
          <Text style={styles.summaryBadgeCount}>{products.length} รายการ</Text>
        </View>

        {/* ป้ายแสดงจำนวนสินค้าแยกตามแต่ละหมวดหมู่ */}
        {categories.map((cat) => (
          <View key={cat} style={styles.summaryBadge}>
            <Text style={styles.summaryBadgeLabel}>{cat}</Text>
            <Text style={styles.summaryBadgeCount}>{categoryCounts[cat]} รายการ</Text>
          </View>
        ))}
      </View>

      {/* 
        FlatList: แสดงผลรายการข้อมูลสินค้าแบบเลื่อนได้ (Scrollable List)
        ข้อดีของ FlatList คือจะเรนเดอร์เฉพาะรายการที่ปรากฏอยู่บนหน้าจอ ณ ขณะนั้น
        ช่วยประหยัดหน่วยความจำและทำงานได้ลื่นไหล แม้มีข้อมูลจำนวนมาก
      */}
      <FlatList
        /**
         * data: แหล่งข้อมูล Array ที่ต้องการนำมาแสดงผล
         * ในที่นี้คือข้อมูลสินค้าทั้งหมดที่โหลดมาจาก products.json
         */
        data={products}

        /**
         * keyExtractor: ฟังก์ชันกำหนด Key ที่เป็นเอกลักษณ์ (Unique Key) ให้แต่ละไอเทม
         * React Native ใช้ Key ในการติดตามและอัปเดตองค์ประกอบในลิสต์อย่างมีประสิทธิภาพ
         * ในที่นี้แปลง item.id ให้เป็น string เพื่อใช้เป็น Key ประจำตัวสินค้า
         */
        keyExtractor={(item) => item.id.toString()}

        /**
         * renderItem: ฟังก์ชันสำหรับเรนเดอร์หน้าตาของแต่ละไอเทมในรายการ
         * รับพารามิเตอร์ { item } ซึ่งคือข้อมูลสินค้า 1 ชิ้นในรอบนั้นๆ
         * แล้วส่งต่อไปเป็น props ให้กับคอมโพเนนต์ Card เพื่อแสดงผล
         */
        renderItem={({ item }) => (
          <Card 
            id={item.id}              // รหัสสินค้า
            name={item.name}          // ชื่อสินค้า
            price={item.price}        // ราคาสินค้า
            category={item.category}  // หมวดหมู่สินค้า
            stock={item.stock}        // จำนวนสินค้าคงเหลือในสต็อก
            image={item.image}        // URL รูปภาพสินค้า
          />
        )}
      />

    </View>
  )
}

/**
 * StyleSheet: styles
 * สไตล์สำหรับจัดหน้าตาและเลย์เอาต์ของหน้าจอหลัก
 */
const styles = StyleSheet.create({
  /**
   * สไตล์กล่องครอบหลักของหน้าจอ
   */
  container: {
    flex: 1,                    // ให้ขยายเต็มพื้นที่หน้าจอทั้งหมด (ทั้งแนวตั้งและแนวนอน)
    paddingTop: 50,             // เว้นระยะห่างด้านบน 50 หน่วย เพื่อไม่ให้เนื้อหาชนกับแถบสถานะ (Status Bar) หรือรอยบากของหน้าจอ
    backgroundColor: "#223e9a"   // กำหนดสีพื้นหลังหลักของหน้าจอ (โทนสีน้ำเงิน)
  },

  /**
   * สไตล์ข้อความส่วนหัวข้อ (Header)
   */
  header: {
    fontSize: 28,               // กำหนดขนาดตัวอักษร 28 หน่วย
    textAlign: "center",        // จัดให้อยู่กึ่งกลางหน้าจอ
    color: '#ffffff',           // กำหนดสีตัวอักษรเป็นสีขาว
    fontWeight: 'bold',         // ปรับตัวอักษรให้หนา
    marginBottom: 10,           // เว้นระยะห่างด้านล่างก่อนถึงแผงสรุปหมวดหมู่
  },

  /**
   * แผงกล่องสรุปหมวดหมู่และจำนวนสินค้า
   */
  summaryContainer: {
    flexDirection: "row",       // จัดเรียงป้ายสรุปแนวนอน
    flexWrap: "wrap",           // อนุญาตให้ขึ้นบรรทัดใหม่ได้หากป้ายยาวเกินความกว้างหน้าจอ
    justifyContent: "center",   // จัดวางป้ายให้อยู่กึ่งกลาง
    gap: 8,                     // ระยะห่างระหว่างป้ายแต่ละชิ้น
    paddingHorizontal: 16,      // ระยะห่างซ้ายขวา
    marginBottom: 12,           // เว้นระยะห่างด้านล่างก่อนเริ่มแสดงรายการสินค้า FlatList
  },

  /**
   * สไตล์ป้ายสรุปสินค้าทั้งหมด (เน้นสีสว่าง)
   */
  summaryBadgeTotal: {
    backgroundColor: "#ff9800", // สีส้มเพื่อความโดดเด่นของยอดรวม
    flexDirection: "row",       // แสดงป้ายชื่อและจำนวนแนวนอน
    alignItems: "center",       // จัดให้อยู่กึ่งกลางแนวตั้ง
    paddingVertical: 6,         // ระยะห่างบนล่าง
    paddingHorizontal: 12,      // ระยะห่างซ้ายขวา
    borderRadius: 20,           // มุมโค้งมนแบบ Pill
    gap: 6,                     // ระยะห่างระหว่างข้อความ
  },

  /**
   * สไตล์ป้ายสรุปแต่ละหมวดหมู่
   */
  summaryBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // พื้นหลังสีขาวโปร่งแสง
    flexDirection: "row",       // แสดงชื่อหมวดและจำนวนแนวนอน
    alignItems: "center",       // จัดกึ่งกลางแนวตั้ง
    paddingVertical: 6,         // ระยะห่างบนล่าง
    paddingHorizontal: 12,      // ระยะห่างซ้ายขวา
    borderRadius: 20,           // ขอบมนแบบ Pill
    gap: 6,                     // ระยะห่างระหว่างข้อความ
  },

  /**
   * สไตล์ข้อความชื่อหมวดหมู่
   */
  summaryBadgeLabel: {
    color: "#ffffff",           // สีตัวอักษรสีขาว
    fontSize: 13,               // ขนาดตัวอักษร
    fontWeight: "bold",         // ตัวหนา
  },

  /**
   * สไตล์ข้อความตัวเลขจำนวนรายการ
   */
  summaryBadgeCount: {
    color: "#ffffff",           // สีตัวอักษรสีขาว
    fontSize: 13,               // ขนาดตัวอักษร
    opacity: 0.9,               // ลดความทึบลงเล็กน้อยเพื่อให้อ่านง่าย
  },
})
