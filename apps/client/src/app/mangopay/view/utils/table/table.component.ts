import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  Input,
  AfterViewInit,
  Directive,
  TemplateRef,
  ContentChildren,
  QueryList,
  EventEmitter,
  Output,
  Pipe,
  PipeTransform,
  HostListener,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

/**
 * @dev Allows to sort nested object
 */
 export function sortingDataAccessor(item: Record<string, unknown>, property: string) {
  if (property.includes('.')) {
    return property.split('.').reduce((object, key) => (object as any)[key], item);
  }
  return item[property];
}

/**
 * @dev This method is used as a fallback for tables filter predicates
 * If component does not provide it's own filterPredicate functions,
 * this will be used instead.
 */
export function fallbackFilterPredicate(data: unknown, filter: string) {
  return JSON.stringify(data).toLowerCase().indexOf(filter) !== -1;
}

@Pipe({ name: 'findColRef' })
export class QueryListFindPipe implements PipeTransform {
  transform(queryList: QueryList<ColRefDirective>, key: string) {
    return queryList.find(query => query.colRef === key);
  }
}

@Directive({ selector: '[colRef]' })
export class ColRefDirective {
  /** This should be the name of the column this template will be used into. */
  @Input() colRef: string = '';
  @Input() label: string = '';
  constructor(public template: TemplateRef<unknown>) { }
}

@Component({
  selector: 'mango-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableFilterComponent implements AfterViewInit {

  // Name of the column headers
  @Input() pageSize = 10;
  @Input() filterPredicate?: (data: unknown, filter: string) => boolean;
  @Input() set source(data: unknown[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    if (this.filterPredicate) {
      this.dataSource.filterPredicate = this.filterPredicate;
    } else {
      this.dataSource.filterPredicate = fallbackFilterPredicate;
    }
    // this.dataSource.sortingDataAccessor = sortingDataAccessor;
    this.dataSource.sort = this.sort;
  }

  @Output() rowClick = new EventEmitter();

  // Column & rows
  dataSource?: MatTableDataSource<unknown>;

  // Filters
  columnFilter = new FormControl([]);

  /** References to template to apply for specific columns */
  @ContentChildren(ColRefDirective, { descendants: false }) cols!: QueryList<ColRefDirective>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columns?: string[];

  ngAfterViewInit() {
    this.columns = this.cols.map(col => col.colRef);
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(filterValue: string) {
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }
}
