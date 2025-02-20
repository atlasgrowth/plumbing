
import os

files_to_read = [
    'client/src/App.tsx',
    'client/src/components/Header.tsx',
    'client/src/main.tsx',
    'client/src/pages/Home.tsx',
    'client/src/pages/Residential.tsx',
    'client/src/pages/Commercial.tsx'
]

def read_file_contents(filepath):
    try:
        with open(filepath, 'r') as file:
            print(f"\n{'='*50}")
            print(f"Contents of {filepath}:")
            print(f"{'='*50}")
            print(file.read())
    except Exception as e:
        print(f"Error reading {filepath}: {str(e)}")

def main():
    for filepath in files_to_read:
        read_file_contents(filepath)

if __name__ == "__main__":
    main()
