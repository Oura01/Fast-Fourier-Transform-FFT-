// Fast Fourier Transform (FFT) using Float32Arrays for efficient computation

function fft(real, imag) {
    const N = real.length; // Get the length of the input arrays
    if (N <= 1) return { real, imag }; // Base case: if there's only one element, return it as the FFT result

    // Create arrays for the even and odd indexed elements of the input
    const evenReal = new Float32Array(N / 2); // Real part of even-indexed elements
    const evenImag = new Float32Array(N / 2); // Imaginary part of even-indexed elements
    const oddReal = new Float32Array(N / 2); // Real part of odd-indexed elements
    const oddImag = new Float32Array(N / 2); // Imaginary part of odd-indexed elements

    // Populate the even and odd arrays
    for (let i = 0; i < N / 2; i++) {
        evenReal[i] = real[2 * i]; // Fill real part of even-indexed
        evenImag[i] = imag[2 * i]; // Fill imaginary part of even-indexed
        oddReal[i] = real[2 * i + 1]; // Fill real part of odd-indexed
        oddImag[i] = imag[2 * i + 1]; // Fill imaginary part of odd-indexed
    }

    // Recursively compute FFT of even and odd parts
    const evenFFT = fft(evenReal, evenImag); // FFT of even parts
    const oddFFT = fft(oddReal, oddImag); // FFT of odd parts

    // Create arrays for the FFT results
    const resultReal = new Float32Array(N); // Real part of FFT result
    const resultImag = new Float32Array(N); // Imaginary part of FFT result

    // Combine the results from even and odd FFTs
    for (let k = 0; k < N / 2; k++) {
        const angle = -2 * Math.PI * k / N; // Calculate the angle for the current FFT component
        const tReal = Math.cos(angle) * oddFFT.real[k] - Math.sin(angle) * oddFFT.imag[k]; // Real part of the twiddle factor
        const tImag = Math.sin(angle) * oddFFT.real[k] + Math.cos(angle) * oddFFT.imag[k]; // Imaginary part of the twiddle factor
        resultReal[k] = evenFFT.real[k] + tReal; // Real part of the k-th FFT component
        resultImag[k] = evenFFT.imag[k] + tImag; // Imaginary part of the k-th FFT component
        resultReal[k + N / 2] = evenFFT.real[k] - tReal; // Real part of the (k + N/2)-th FFT component
        resultImag[k + N / 2] = evenFFT.imag[k] - tImag; // Imaginary part of the (k + N/2)-th FFT component
    }

    return { real: resultReal, imag: resultImag }; // Return the FFT result
}

/**
 * Main function to demonstrate FFT on a sample signal.
 */
function main() {
    // Sample signal: [1, 0, 0, 0] corresponds to a single peak (simple example)
    const real = new Float32Array([1, 0, 0, 0]); // Real part of the sample signal
    const imag = new Float32Array([0, 0, 0, 0]); // Imaginary part of the sample signal

    // Compute FFT
    const { real: fftReal, imag: fftImag } = fft(real, imag); // Perform FFT

    // Print the FFT result
    console.log('FFT Result:'); // Log heading
    for (let i = 0; i < fftReal.length; i++) {
        console.log(`Index ${i}: Real = ${fftReal[i].toFixed(2)}, Imaginary = ${fftImag[i].toFixed(2)}`); // Log each FFT component
    }
}

// Run the main function to see the FFT in action
main();
