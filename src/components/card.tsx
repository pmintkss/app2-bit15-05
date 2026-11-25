/**
 * ============================================================================
 * ไฟล์: src/components/card.tsx
 * หน้าที่: คอมโพเนนต์ (Component) สำหรับแสดงผลการ์ดข้อมูลสินค้า 1 ชิ้น
 * ============================================================================
 * 
 * รายละเอียดการทำงาน:
 * - รับข้อมูลสินค้าผ่าน Props ได้แก่ id, name, price, category, stock, และ image
 * - จัดวางเลย์เอาต์แบบแนวนอน (Row layout) ประกอบด้วย:
 *   1. รูปภาพสินค้า (ด้านซ้าย)
 *   2. ข้อมูลสินค้า: ชื่อสินค้า + แท็กบอกหมวดหมู่ + จำนวนคงเหลือในสต็อก (ตรงกลาง)
 *   3. ป้ายราคา (ด้านขวา แสดงเฉพาะเมื่อมีการส่งราคาเข้ามา)
 */

// นำเข้า UI Components พื้นฐานและ StyleSheet จาก React Native
import { Image, StyleSheet, Text, View } from 'react-native'

type CardProps = {
    id: number,
    name: string,
    price: number,
    category: string,
    stock?: number,
    image: string
}

/**
 * คอมโพเนนต์ Card
 * ทำหน้าที่เรนเดอร์โครงสร้าง UI ของการ์ดสินค้าตามข้อมูลที่ได้รับจาก Props
 * 
 * @param {CardProps} props - ข้อมูลสินค้าที่ถูกส่งมาจากคอมโพเนนต์แม่ (Parent Component)
 * @returns {JSX.Element} - หน้าตา UI ของการ์ดสินค้า
 */
export default function Card({ id, name, price, category, stock, image }: CardProps) {
    return (
        /* กล่องหลักของการ์ด (Container Box) */
        <View style={cardStyle.box}>
            
            {/* 
              ส่วนแสดงรูปภาพสินค้า:
              - source={{ uri: image }}: กำหนดที่มารูปภาพจาก URL (Network Image)
              - style={cardStyle.image}: กำหนดขนาด ความกว้าง ความสูง และมุมโค้งของรูปภาพ
            */}
            <Image source={{ uri: image }} style={cardStyle.image} />
            
            {/* 
              ส่วนแสดงรายละเอียดสินค้า (ชื่อ + หมวดหมู่ + สต็อก):
              - ตั้ง flex: 1 เพื่อให้พื้นที่ตรงกลางยืดขยายตามขนาดหน้าจอ
            */}
            <View style={cardStyle.infoBox}>
                <Text style={cardStyle.text}>{name}</Text>
                
                {/* แถวแสดงป้ายหมวดหมู่และสต็อกสินค้า */}
                <View style={cardStyle.tagsRow}>
                    {/* แสดงแท็กหมวดหมู่สินค้า เมื่อมีการส่ง category เข้ามา */}
                    {category && (
                        <View style={cardStyle.categoryBadge}>
                            <Text style={cardStyle.categoryText}>🏷️ {category}</Text>
                        </View>
                    )}

                    {/* 
                      ส่วนแสดงจำนวนสต็อกสินค้า (Conditional Rendering):
                      - แสดงจำนวนคงเหลือ หรือแจ้งเตือนสินค้าหมดเมื่อ stock เป็น 0
                    */}
                    {stock !== undefined && (
                        <View style={[
                            cardStyle.stockBadge, 
                            stock === 0 && cardStyle.stockBadgeEmpty
                        ]}>
                            <Text style={[
                                cardStyle.stockText,
                                stock === 0 && cardStyle.stockTextEmpty
                            ]}>
                                {stock > 0 ? `📦 คงเหลือ ${stock} ชิ้น` : '❌ สินค้าหมด'}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
            
            {/* 
              ส่วนแสดงราคาแบบมีเงื่อนไข (Conditional Rendering):
              - เช็คว่า price ไม่ใช่ undefined (มีการส่งราคาเข้ามาจริง)
              - หากมีราคา จะทำการเรนเดอร์กล่องป้ายราคา (priceBox) ขึ้นมา
              - หากไม่มีราคา ส่วนนี้จะไม่ถูกเรนเดอร์ลงใน UI
            */}
            {price !== undefined && (
                <View style={cardStyle.priceBox}>
                    {/* ข้อความราคาสินค้า พร้อมต่อท้ายด้วยหน่วย 'บาท' */}
                    <Text style={cardStyle.priceText}>{price} บาท</Text>
                </View>
            )}
        </View>
    )
}

/**
 * StyleSheet: cardStyle
 * รวมการกำหนดสไตล์ (CSS-in-JS) สำหรับตกแต่งคอมโพเนนต์ Card
 */
const cardStyle = StyleSheet.create({
    /**
     * สไตล์กล่องการ์ดภายนอกสุด
     */
    box: {
        flexDirection: "row",       // จัดเรียงไอเทมภายในแนวนอน (จากซ้ายไปขวา: รูป -> ข้อมูลสินค้า -> ราคา)
        alignItems: "center",       // จัดให้อยู่กึ่งกลางในแนวตั้ง (แกนรอง / Cross Axis)
        backgroundColor: "#0a1d67", // สีพื้นหลังของการ์ด (โทนสีน้ำเงินเข้ม)
        gap: 12,                    // ระยะห่างระหว่างไอเทมแต่ละชิ้นในกล่อง (รูป, ข้อมูล, ป้ายราคา)
        marginHorizontal: 14,       // ระยะห่างแนวนอนซ้ายขวาจากการ์ดถึงขอบจอ
        marginVertical: 6,          // ระยะห่างแนวตั้งระหว่างการ์ดแต่ละใบ
        borderRadius: 16,           // ทำขอบการ์ดให้มีความโค้งมน ดูนุ่มนวลและทันสมัย
        padding: 10                 // ระยะห่างภายในขอบการ์ด ช่วยไม่ให้เนื้อหาชิดขอบการ์ดมากเกินไป
    },

    /**
     * สไตล์ของรูปภาพสินค้า
     */
    image: {
        width: 80,                  // กำหนดความกว้างของรูปภาพคงที่ 80 หน่วย (points)
        height: 80,                 // กำหนดความสูงของรูปภาพคงที่ 80 หน่วย (สัดส่วน 1:1 จัตุรัส)
        borderRadius: 12,           // ปรับมุมรูปภาพให้โค้งมน รับกับดีไซน์ของการ์ด
    },

    /**
     * กล่องจัดข้อมูลชื่อสินค้าและหมวดหมู่
     */
    infoBox: {
        flex: 1,                    // ขยายพื้นที่ให้กว้างที่สุดเท่าที่จะทำได้ระหว่างรูปกับป้ายราคา
        justifyContent: "center",   // จัดวางเนื้อหาให้อยู่กึ่งกลางแนวตั้ง
        gap: 6                      // ระยะห่างระหว่างชื่อสินค้าและแท็กแถวล่าง
    },

    /**
     * สไตล์ของข้อความชื่อสินค้า
     */
    text: {
        fontSize: 18,               // ขนาดตัวอักษร 18 หน่วย
        fontWeight: 'bold',         // ปรับตัวอักษรให้หนาเพื่อความโดดเด่นและอ่านง่าย
        color: '#ffffff',           // ตัวหนังสือสีขาว เพื่อตัดกับพื้นหลังสีน้ำเงินเข้ม
    },

    /**
     * แถวจัดวางป้ายแท็กหมวดหมู่และป้ายสต็อก
     */
    tagsRow: {
        flexDirection: "row",       // จัดเรียงแท็กแนวนอน
        alignItems: "center",       // กึ่งกลางแนวตั้ง
        flexWrap: "wrap",           // ตัดขึ้นบรรทัดใหม่ได้ถ้าหน้าจอแคบ
        gap: 6,                     // ระยะห่างระหว่างแท็ก
    },

    /**
     * สไตล์ป้ายแท็กหมวดหมู่ (Category Badge)
     */
    categoryBadge: {
        alignSelf: "flex-start",    // ปรับขนาดความกว้างของป้ายให้พอดีกับข้อความข้างใน
        backgroundColor: "rgba(255, 255, 255, 0.15)", // พื้นหลังโปร่งแสงสีขาว
        paddingHorizontal: 8,       // ระยะห่างแนวนอนซ้ายขวาในป้าย
        paddingVertical: 2,         // ระยะห่างแนวตั้งบนล่างในป้าย
        borderRadius: 6,            // ทำขอบป้ายมน
    },

    /**
     * สไตล์ตัวหนังสือหมวดหมู่
     */
    categoryText: {
        fontSize: 12,               // ตัวหนังสือขนาดกะทัดรัด
        color: '#d0d8ff',           // สีฟ้าสว่างอมขาว เพื่อให้อ่านง่าย
        fontWeight: '500',          // ความหนาปานกลาง
    },

    /**
     * สไตล์ป้ายสต็อกสินค้าคงเหลือ (Stock Badge)
     */
    stockBadge: {
        alignSelf: "flex-start",    // ขยายตามขนาดข้อความ
        backgroundColor: "rgba(76, 175, 80, 0.2)", // สีเขียวโปร่งแสงแสดงว่ามีของ
        borderColor: "rgba(76, 175, 80, 0.4)",      // ขอบสีเขียวอ่อน
        borderWidth: 1,             // ความหนาเส้นขอบ
        paddingHorizontal: 8,       // ระยะห่างแนวนอนซ้ายขวา
        paddingVertical: 2,         // ระยะห่างแนวตั้งบนล่าง
        borderRadius: 6,            // ทำขอบป้ายมน
    },

    /**
     * สไตล์ป้ายกรณีสินค้าหมดสต็อก (Out of Stock)
     */
    stockBadgeEmpty: {
        backgroundColor: "rgba(244, 67, 54, 0.2)", // สีแดงโปร่งแสงกรณีของหมด
        borderColor: "rgba(244, 67, 54, 0.4)",
    },

    /**
     * สไตล์ตัวหนังสือสต็อกสินค้า
     */
    stockText: {
        fontSize: 12,               // ขนาดตัวอักษร 12 หน่วย
        color: '#a5d6a7',           // ตัวหนังสือสีเขียวอ่อนสดใส อ่านง่าย
        fontWeight: '500',
    },

    /**
     * สไตล์ตัวหนังสือสต็อกกรณีของหมด
     */
    stockTextEmpty: {
        color: '#ef9a9a',           // ตัวหนังสือสีแดงอ่อน
    },

    /**
     * สไตล์กล่องป้ายแสดงราคา (Badge / Pill Box)
     */
    priceBox: {
        backgroundColor: "#4130ac", // สีพื้นหลังป้ายราคา (โทนสีน้ำเงินม่วง เพื่อให้ตัดกับการ์ด)
        paddingVertical: 6,         // ระยะห่างด้านบนและล่างภายในป้ายราคา 6 หน่วย
        paddingHorizontal: 12,      // ระยะห่างด้านซ้ายและขวาภายในป้ายราคา 12 หน่วย
        borderRadius: 12,           // ทำให้ขอบป้ายราคาโค้งมนคล้ายเม็ดยา (Pill shape)
        alignItems: "center",       // จัดข้อความให้อยู่กึ่งกลางแนวนอน
        justifyContent: "center",    // จัดข้อความให้อยู่กึ่งกลางแนวตั้ง
    },

    /**
     * สไตล์ตัวอักษรของราคา
     */
    priceText: {
        fontSize: 15,               // ขนาดตัวอักษร 15 หน่วย
        fontWeight: 'bold',         // ปรับตัวหนาเพื่อให้อ่านตัวเลขได้ชัดเจน
        color: '#ffffff',           // ตัวหนังสือสีขาว
    }
})
