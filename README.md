# 3D Ring Customizer 

A sleek 3D ring customizer built with **React Three Fiber**, **Three.js**, and **Valtio**. Features real-time part selection, live color customization via a **color picker**, dynamic floating animation, and responsive design. Includes interactive **cursor feedback**, **HDR lighting**, and realistic **contact shadows** for a polished WebGL experience.

[![Hero Screenshot](public/heropage)](https://ring-customizer-psi.vercel.app/)

---

## ✨ Features

* 💍 **Interactive 3D Ring Model** with selectable parts and instant color updates
* 🎨 **Live Color Picker** powered by `react-colorful` for intuitive customization
* 🌀 **Floating Animation** for smooth visual presentation using `useFrame`
* 💡 **HDR Environment Lighting** with soft **Contact Shadows** for realism
* 🖱️ **Custom SVG Cursor** dynamically updates on hover to indicate interactivity
* 🔁 **Responsive UI** with media query breakpoints for all screen sizes
* ⚛️ **Reactive State** management using **Valtio** for fast color updates
* 🌐 **Optimized WebGL Scene** using lazy-loading, `Suspense`, and postprocessing

---

## 🧠 How It Works

* Loads a **GLB ring model** and uses material names to identify parts (inner, outer, gem)
* Stores and manages color state with **Valtio proxy** for reactivity
* Uses `useFrame` for subtle **rotation and floating motion**
* Enables part selection via **pointer events** and sets the current material
* Displays a `HexColorPicker` when a part is selected, instantly updating its material color
* Applies material updates using `material-color` and custom `MeshRefractionMaterial` for gemstones
* Adds realism with **ambient**, **spot**, and **environmental lighting**
* Renders **contact shadows** beneath the ring to anchor it visually

---

## 🛠️ Built With

* [**React Three Fiber**](https://docs.pmnd.rs/react-three-fiber) – Declarative Three.js renderer for React
* [**Three.js**](https://threejs.org/) – Low-level 3D engine used for rendering and materials
* [**Valtio**](https://valtio.pmnd.rs/) – Lightweight proxy-based state management
* [**react-colorful**](https://react-colorful.app/) – Minimal color picker for real-time updates
* [**@react-three/drei**](https://github.com/pmndrs/drei) – Helpers like `useGLTF`, `Environment`, `ContactShadows`, and `OrbitControls`
* [**GLB Model Format**](https://github.com/KhronosGroup/glTF) – Compact 3D model format used for the ring asset

---

## 🚀 Getting Started

```bash
git clone https://github.com/its-riki-dev/ring-customizer.git

# Navigate into the project folder
cd ring-configurator

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📄 License

- This project is licensed under the MIT License.
