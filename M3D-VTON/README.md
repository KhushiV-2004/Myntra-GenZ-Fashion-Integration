# M3D-VTON: A Monocular-to-3D Virtual Try-On Network

Official code repository for the ICCV 2021 paper "M3D-VTON: A Monocular-to-3D Virtual Try-On Network".

## Overview

M3D-VTON is a virtual try-on network designed to generate 3D clothing try-on results from monocular images. It utilizes advanced image processing and deep learning techniques to simulate realistic virtual try-on experiences.

![M3D-VTON Teaser](/assets/teaser.gif)

## Requirements

- Python >= 3.8.0
- PyTorch == 1.6.0
- torchvision == 0.7.0

## Data Preparation

### MPV3D Dataset

To prepare the MPV3D Dataset:
- Download the [MPV3D Dataset](https://drive.google.com/file/d/1qcynpXZ9eSlzTV-RDCr-Yip3GcuU314h/view?usp=sharing)
- Run the data preprocessing script:
  ```sh
  python util/data_preprocessing.py --MPV3D_root path/to/MPV3D/dataset


