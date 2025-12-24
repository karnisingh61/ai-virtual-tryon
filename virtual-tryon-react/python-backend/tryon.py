import cv2
import numpy as np

def virtual_tryon(person_path, cloth_path, output_path):
    print("🟦 Generating Try-On Output (Local AI Style)...")

    # Read images
    person = cv2.imread(person_path)
    cloth = cv2.imread(cloth_path)

    if person is None or cloth is None:
        print("❌ Could not read images!")
        return False

    ph, pw, _ = person.shape

    # Resize cloth to reasonable size (torso region)
    target_width = int(pw * 0.55)
    scale = target_width / cloth.shape[1]
    cloth_resized = cv2.resize(cloth, (target_width, int(cloth.shape[0] * scale)))

    # Create mask for cloth
    gray = cv2.cvtColor(cloth_resized, cv2.COLOR_BGR2GRAY)
    _, mask = cv2.threshold(gray, 15, 255, cv2.THRESH_BINARY)

    mask_inv = cv2.bitwise_not(mask)

    # Rough placement area
    y_offset = int(ph * 0.28)
    x_offset = int(pw * 0.23)

    # Crop ROI
    roi = person[y_offset:y_offset + cloth_resized.shape[0], x_offset:x_offset + cloth_resized.shape[1]]

    # Mask cloth onto ROI
    bg = cv2.bitwise_and(roi, roi, mask=mask_inv)
    fg = cv2.bitwise_and(cloth_resized, cloth_resized, mask=mask)

    combined = cv2.add(bg, fg)
    person[y_offset:y_offset + cloth_resized.shape[0], x_offset:x_offset + cloth_resized.shape[1]] = combined

    cv2.imwrite(output_path, person)
    print("✅ Try-On saved at:", output_path)
    return True


if __name__ == "__main__":
    virtual_tryon("person.jpg", "cloth.jpg", "output.jpg")
