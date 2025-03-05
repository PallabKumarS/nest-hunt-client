"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ban, Edit, Eye, Trash2 } from "lucide-react";
import { TMeta, TMongoose } from "@/types";
import { PaginationComponent } from "./Pagination";
import ConfirmationBox from "./ConfirmationBox";
import { Button } from "../ui/button";
import NoData from "./NoData";

type TTableProps<T> = {
  data: (T & TMongoose)[];
  heads: string[];
  meta: TMeta;
  caption?: string;
  cellProperties: (keyof T)[];
  onDelete?: (item: T & TMongoose) => void;
  onEdit?: (item: T & TMongoose) => void;
  onView?: (item: T & TMongoose) => void;
  onStatusChange?: (data: T & TMongoose, status?: string) => void;
  onRoleChange?: (user: T & TMongoose, role: string) => void;
};

export function TableComponent<T>({
  data,
  heads,
  meta,
  caption,
  cellProperties,
  onDelete,
  onView,
  onEdit,
  onStatusChange,
  onRoleChange,
}: TTableProps<T>) {
  if (!data || data.length === 0) {
    return <NoData />;
  }

  return (
    <div className="w-full border overflow-x-auto rounded-lg shadow-md">
      <Table>
        {caption && (
          <TableCaption className="text-lg font-semibold mb-4">
            {caption}
          </TableCaption>
        )}
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-800">
            {heads.map((head, index) => (
              <TableHead
                key={index}
                className={`
                  font-bold 
                  text-gray-700 
                  dark:text-gray-200
                  text-center
                `}
              >
                {head}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item._id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {cellProperties.map((prop, index) => (
                <TableCell
                  key={index}
                  className={`
                    py-3 
                    ${index === 0 ? "font-medium" : ""}
                    text-center
                  `}
                >
                  {formatCellContent(
                    item[prop],
                    prop,
                    item,
                    onStatusChange,
                    onRoleChange
                  )}
                </TableCell>
              ))}

              {/* actions cell  */}
              <TableCell className="flex items-center justify-center gap-2">
                {/* view action  */}
                {onView && (
                  <Button
                    onClick={() => onView && onView(item)}
                    size="sm"
                    variant="outline"
                    className="flex items-center justify-center hover:bg-blue-500 hover:text-white"
                  >
                    <Eye className="h-4 w-4 text-blue-500" />
                  </Button>
                )}

                {/* edit action  */}
                {onEdit && !(item as any)?.isDeleted && (
                  <Button
                    onClick={() => onEdit && onEdit(item)}
                    size="sm"
                    variant="outline"
                    className="flex items-center justify-center hover:bg-green-500 hover:text-white"
                  >
                    <Edit className="h-4 w-4 text-green-500" />
                  </Button>
                )}

                {/* delete action  */}
                {onDelete && !(item as any)?.isDeleted && (
                  <ConfirmationBox
                    trigger={
                      <p
                        className="flex items-center justify-center py-1 px-2 rounded-sm border border-input bg-background text-xs font-medium ring-offset-background transition-colors hover:bg-red-500 hover:text-white flex-1
"
                      >
                        <Trash2 className="h-5 w-5 text-red-500" />
                      </p>
                    }
                    onConfirm={() => onDelete && onDelete(item)}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-6 flex justify-center">
        <PaginationComponent meta={meta} />
      </div>
    </div>
  );
}

// content manage
function formatCellContent<T>(
  content: any,
  prop: string | number | symbol,
  item: any,
  onStatusChange?: (data: T & TMongoose, status?: string) => void,
  onRoleChange?: (user: T & TMongoose, role: string) => void
): React.ReactNode {
  if (item.isDeleted) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-600">
        <Ban className="w-3.5 h-3.5" />
        On delete
      </span>
    );
  } else {
    if (typeof content === "boolean") {
      // for user status only
      if (prop === "isActive") {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`px-2 py-1 rounded-md ${
                content
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {content ? "Active" : "Inactive"}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                disabled={content === true}
                onClick={() => onStatusChange && onStatusChange(item)}
              >
                Activate
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={content === false}
                onClick={() => onStatusChange && onStatusChange(item)}
              >
                Deactivate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
      // for listing boolean values
      if (prop === "isAvailable") {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`px-2 py-1 rounded-md ${
                content
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {content ? "Available" : "Not Available"}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                disabled={content === true}
                onClick={() => onStatusChange && onStatusChange(item)}
              >
                Make Available
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={content === false}
                onClick={() => onStatusChange && onStatusChange(item)}
              >
                Make Rented
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }

    // for user role only
    if (prop === "role") {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            className={`px-2 py-1 rounded-md ${
              content === "admin"
                ? "bg-purple-100 text-purple-600"
                : content === "landlord"
                ? "bg-blue-100 text-blue-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {content}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              disabled={content === "admin"}
              onClick={() => onRoleChange && onRoleChange(item, "admin")}
            >
              Admin
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={content === "landlord" || content === "admin"}
              onClick={() => onRoleChange && onRoleChange(item, "landlord")}
            >
              Landlord
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={content === "tenant" || content === "admin"}
              onClick={() => onRoleChange && onRoleChange(item, "tenant")}
            >
              Tenant
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    if (typeof content === "number") {
      return content.toLocaleString();
    }

    if (content instanceof Date) {
      return content.toLocaleDateString();
    }

    return content;
  }
}
