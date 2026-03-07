<template>
	<VTable
		ref="tableCourses"
		:provider="tableProvider"
		:loading="tableCourses.loading"
		:columns="tableCourses.columns"
		:sorting="tableCourses.sorting"
		:filters="tableCourses.filters"
		@clear:filters="clearFilters"
	>
		<template #filters>
			<UFormField
				label="Colleges"
			>
				<USelect
					v-model="tableCourses.filters.college"
					value-key="id"
					label-key="college_name"
					:items="filterColleges"
					:loading="fetching.colleges"
					:disabled="fetching.colleges"
					:ui="{ content: 'md:min-w-fit wrap-break-word' }"
					placeholder="filter here"
					class="w-full"
				/>
			</UFormField>
		</template>

		<template #select-cell="{ row }">
			<UCheckbox
				size="xl"
				:model-value="row.getIsSelected()"
				:disabled="!row.getCanSelect()"
				@change="() => row.toggleSelected()"
			/>
		</template>

		<template #actions-cell="{ row }">
			<div class="flex justify-center">
				<UButton
					size="sm"
					label="Edit"
					color="primary"
					@click="() => $emit('edit:course', row.original)"
				/>
			</div>
		</template>
	</VTable>
</template>
<script>
import TableUtils from '@/components/table/mixins/utils'

import MColleges from '@/mixins/maintenances/colleges'

import { SAdminCourses } from '@/services/admin'

export default {
	name: 'AdminCourseTable',

	emits: [
		'edit:course',
		'delete:course'
	],

	mixins: [
		TableUtils,
		MColleges
	],

	data () {
		return {
			tableCourses: {
				loading: false,
				sorting: {
					id: 'id',
					desc: false
				},
				filters: {
					search: '',
					college: 'All'
				},
				columns: [
					{ id: 'select', meta: { label: 'Select' }, enableHiding: false, header: this.getTableHeaderSelect },
					{ id: 'index', meta: { label: '#', class: { td: 'text-center', th: 'text-center w-[40px]' } }, cell: this.tableNumber },
					{ id: 'actions', meta: { label: 'Actions', class: { th: 'text-center' } }, enableHiding: false },
					{ id: 'course_code', meta: { label: 'Course Code' }, enableSorting: true },
					{ id: 'course_name', meta: { label: 'Course Name' }, enableSorting: true },
					{ id: 'college.college_name', meta: { label: 'College' }, enableSorting: true }
				].map(this.transformColumns)
			}
		}
	},

	computed: {
		filterColleges () {
			return [
				{ id: 'All', college_name: 'All' }
			].concat(this.options.colleges)
		}
	},

	mounted () {
		this.getColleges(this)
	},

	methods: {
		async tableProvider({ sort, sortDesc, perPage, currentPage, filters }) {
			this.tableCourses.loading = true
			return SAdminCourses.get({
				sort,
				sort_desc: sortDesc,
				per_page: perPage,
				page: currentPage,
				search: filters.search,
				college: filters.college
			}).then(
				({ data: { items, total_rows: totalRows } }) => ({
					items,
					totalRows
				})
			).catch(
				() => ({
					items: [],
					totalRows: 0
				})
			).finally(() => {
				this.tableCourses.loading = false
			})
		},

		clearFilters() {
			this.tableCourses.filters = {
				search: '',
				college: 'All'
			}
		},

		tableApi () {
			return this.$refs.tableCourses
		}
	}
}
</script>
