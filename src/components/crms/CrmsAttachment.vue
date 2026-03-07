<template>
  <div class="space-y-3">
    <div
      v-if="title"
      class="flex items-center justify-between"
    >
      <h3 class="text-sm font-semibold">
        {{ title }}
      </h3>
      <UButton
        v-if="allowUpload"
        size="xs"
        icon="i-lucide-upload"
        @click="triggerFileInput"
      >
        Upload
      </UButton>
    </div>

    <!-- File Input -->
    <input
      ref="fileInput"
      type="file"
      :accept="accept"
      :multiple="multiple"
      class="hidden"
      @change="handleFileSelect"
    >

    <!-- File List -->
    <div
      v-if="files.length > 0"
      class="space-y-2"
    >
      <div
        v-for="(file, index) in files"
        :key="index"
        class="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
      >
        <UIcon
          :name="getFileIcon(file)"
          class="text-2xl text-gray-500"
        />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate">
            {{ file.name }}
          </p>
          <p class="text-xs text-gray-500">
            {{ formatFileSize(file.size) }}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <UButton
            v-if="file.url"
            size="xs"
            variant="ghost"
            icon="i-lucide-eye"
            @click="previewFile(file)"
          />
          <UButton
            v-if="file.url"
            size="xs"
            variant="ghost"
            icon="i-lucide-download"
            @click="downloadFile(file)"
          />
          <UButton
            v-if="allowRemove"
            size="xs"
            color="error"
            variant="ghost"
            icon="i-lucide-trash-2"
            @click="removeFile(index)"
          />
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
      @click="triggerFileInput"
    >
      <UIcon
        name="i-lucide-upload-cloud"
        class="text-4xl text-gray-400 mb-2"
      />
      <p class="text-sm text-gray-500">
        Click to upload or drag and drop
      </p>
      <p class="text-xs text-gray-400 mt-1">
        {{ accept || 'Any file type' }}
      </p>
    </div>

    <!-- Preview Modal -->
    <UModal v-model="showPreview">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">
              {{ previewFile.name }}
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-lucide-x"
              @click="showPreview = false"
            />
          </div>
        </template>

        <div class="flex items-center justify-center p-4">
          <img
            v-if="isImage(previewFile)"
            :src="previewFile.url"
            :alt="previewFile.name"
            class="max-w-full max-h-96 object-contain"
          >
          <div
            v-else
            class="text-center"
          >
            <UIcon
              :name="getFileIcon(previewFile)"
              class="text-6xl text-gray-400 mb-4"
            />
            <p class="text-sm text-gray-500">
              Preview not available for this file type
            </p>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script>
export default {
  name: 'CrmsAttachment',

  props: {
    title: {
      type: String,
      default: 'Attachments'
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    accept: {
      type: String,
      default: '*'
    },
    multiple: {
      type: Boolean,
      default: true
    },
    allowUpload: {
      type: Boolean,
      default: true
    },
    allowRemove: {
      type: Boolean,
      default: true
    },
    maxSize: {
      type: Number,
      default: 10 * 1024 * 1024 // 10MB
    }
  },

  emits: ['update:modelValue', 'file-added', 'file-removed', 'error'],

  data () {
    return {
      files: [...this.modelValue],
      showPreview: false,
      previewFile: {}
    }
  },

  watch: {
    modelValue (newVal) {
      this.files = [...newVal]
    },
    files (newVal) {
      this.$emit('update:modelValue', newVal)
    }
  },

  methods: {
    triggerFileInput () {
      this.$refs.fileInput.click()
    },

    handleFileSelect (event) {
      const selectedFiles = Array.from(event.target.files)

      selectedFiles.forEach(file => {
        if (file.size > this.maxSize) {
          this.$emit('error', {
            type: 'size-exceeded',
            file,
            message: `File ${file.name} is too large. Maximum size is ${this.formatFileSize(this.maxSize)}`
          })
          return
        }

        const fileObj = {
          name: file.name,
          size: file.size,
          type: file.type,
          file,
          url: URL.createObjectURL(file)
        }

        this.files.push(fileObj)
        this.$emit('file-added', fileObj)
      })

      // Reset input
      event.target.value = ''
    },

    removeFile (index) {
      const removedFile = this.files[index]
      this.files.splice(index, 1)
      this.$emit('file-removed', removedFile)
    },

    previewFile (file) {
      this.previewFile = file
      this.showPreview = true
    },

    downloadFile (file) {
      const link = document.createElement('a')
      link.href = file.url
      link.download = file.name
      link.click()
    },

    getFileIcon (file) {
      if (!file.type) return 'i-lucide-file'

      if (file.type.startsWith('image/')) return 'i-lucide-image'
      if (file.type.startsWith('video/')) return 'i-lucide-video'
      if (file.type.startsWith('audio/')) return 'i-lucide-music'
      if (file.type.includes('pdf')) return 'i-lucide-file-text'
      if (file.type.includes('word') || file.type.includes('document')) return 'i-lucide-file-text'
      if (file.type.includes('excel') || file.type.includes('spreadsheet')) return 'i-lucide-file-spreadsheet'
      if (file.type.includes('zip') || file.type.includes('compressed')) return 'i-lucide-file-archive'

      return 'i-lucide-file'
    },

    isImage (file) {
      return file.type && file.type.startsWith('image/')
    },

    formatFileSize (bytes) {
      if (bytes === 0) return '0 Bytes'

      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))

      return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
    }
  }
}
</script>
